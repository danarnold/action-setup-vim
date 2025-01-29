"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetDirName = assetDirName;
exports.downloadNeovim = downloadNeovim;
exports.downloadStableNeovim = downloadStableNeovim;
exports.buildNightlyNeovim = buildNightlyNeovim;
const os_1 = require("os");
const path = __importStar(require("path"));
const fs_1 = require("fs");
const node_fetch_1 = __importDefault(require("node-fetch"));
const core = __importStar(require("@actions/core"));
const io = __importStar(require("@actions/io"));
const github = __importStar(require("@actions/github"));
const utils_1 = require("./utils");
const shell_1 = require("./shell");
function parseVersion(v) {
    const m = v.match(/^v0\.(\d+)\.(\d+)$/);
    if (m === null) {
        return null;
    }
    return {
        minor: parseInt(m[1], 10),
        patch: parseInt(m[2], 10),
    };
}
function assetFileName(os, version) {
    switch (os) {
        case 'macos': {
            const v = parseVersion(version);
            if (v !== null && v.minor < 10) {
                return 'nvim-macos.tar.gz';
            }
            switch (process.arch) {
                case 'arm64':
                    return 'nvim-macos-arm64.tar.gz';
                case 'x64':
                    return 'nvim-macos-x86_64.tar.gz';
                default:
                    throw Error(`Unsupported arch for Neovim ${version} on ${os}: ${process.arch}`); // Should be unreachable
            }
        }
        case 'linux':
            const v = parseVersion(version);
            if (v !== null && v.minor <= 10 && v.patch <= 3) {
                return 'nvim-linux64.tar.gz';
            }
            switch (process.arch) {
                case 'arm64':
                    return 'nvim-linux-arm64.tar.gz';
                case 'x64':
                    return 'nvim-linux-x86_64.tar.gz';
                default:
                    throw Error(`Unsupported arch for Neovim ${version} on ${os}: ${process.arch}`); // Should be unreachable
            }
        case 'windows':
            return 'nvim-win64.zip';
    }
}
function assetDirName(version, os) {
    switch (os) {
        case 'macos': {
            const v = parseVersion(version);
            if (v !== null) {
                // Until v0.7.0 release, 'nvim-osx64' was the asset directory name on macOS. However it was changed to
                // 'nvim-macos' from v0.7.1: https://github.com/neovim/neovim/pull/19029
                if (v.minor < 7 || (v.minor === 7 && v.patch < 1)) {
                    return 'nvim-osx64';
                }
                // Until v0.9.5, the single asset nvim-macos.tar.gz is released. From v0.10.0, Neovim provides
                // nvim-macos-arm64.tar.gz (for Apple Silicon) and nvim-macos-x86_64.tar.gz (for Intel Mac). (#30)
                if (v.minor < 10) {
                    return 'nvim-macos';
                }
            }
            switch (process.arch) {
                case 'arm64':
                    return 'nvim-macos-arm64';
                case 'x64':
                    return 'nvim-macos-x86_64';
                default:
                    throw Error(`Unsupported arch for Neovim ${version} on ${os}: ${process.arch}`); // Should be unreachable
            }
        }
        case 'linux':
            const v = parseVersion(version);
            if (v !== null && v.minor <= 10 && v.patch <= 3) {
                return 'nvim-linux64';
            }
            switch (process.arch) {
                case 'arm64':
                    return 'nvim-linux-arm64';
                case 'x64':
                    return 'nvim-linux-x86_64';
                default:
                    throw Error(`Unsupported arch for Neovim ${version} on ${os}: ${process.arch}`); // Should be unreachable
            }
        case 'windows': {
            // Until v0.6.1 release, 'Neovim' was the asset directory name on Windows. However it was changed to 'nvim-win64'
            // from v0.7.0. (#20)
            const v = parseVersion(version);
            if (v !== null && v.minor < 7) {
                return 'Neovim';
            }
            return 'nvim-win64';
        }
    }
}
async function unarchiveAsset(asset, dirName) {
    const dir = path.dirname(asset);
    const dest = path.join(dir, dirName);
    if (asset.endsWith('.tar.gz')) {
        await (0, shell_1.exec)('tar', ['xzf', asset], { cwd: dir });
        return dest;
    }
    if (asset.endsWith('.zip')) {
        await (0, shell_1.unzip)(asset, dir);
        return dest;
    }
    throw new Error(`FATAL: Don't know how to unarchive ${asset} to ${dest}`);
}
// version = 'stable' or 'nightly' or version string
async function downloadNeovim(version, os) {
    const file = assetFileName(os, version);
    const destDir = path.join((0, os_1.homedir)(), `nvim-${version}`);
    const url = `https://github.com/neovim/neovim/releases/download/${version}/${file}`;
    console.log(`Downloading Neovim ${version} on ${os} from ${url} to ${destDir}`);
    const dlDir = await (0, utils_1.makeTmpdir)();
    const asset = path.join(dlDir, file);
    try {
        core.debug(`Downloading asset ${asset}`);
        const response = await (0, node_fetch_1.default)(url);
        if (!response.ok) {
            throw new Error(`Downloading asset failed: ${response.statusText}`);
        }
        const buffer = await response.buffer();
        await fs_1.promises.writeFile(asset, buffer, { encoding: null });
        core.debug(`Downloaded asset ${asset}`);
        const unarchived = await unarchiveAsset(asset, assetDirName(version, os));
        core.debug(`Unarchived asset ${unarchived}`);
        await io.mv(unarchived, destDir);
        core.debug(`Installed Neovim ${version} on ${os} to ${destDir}`);
        return {
            executable: (0, utils_1.exeName)(true, os),
            binDir: path.join(destDir, 'bin'),
        };
    }
    catch (e) {
        const err = (0, utils_1.ensureError)(e);
        core.debug(err.stack ?? err.message);
        let msg = `Could not download Neovim release from ${url}: ${err.message}. Please visit https://github.com/neovim/neovim/releases/tag/${version} to check the asset for ${os} was really uploaded`;
        if (version === 'nightly') {
            msg += ". Note that some assets are sometimes missing on nightly build due to Neovim's CI failure";
        }
        throw new Error(msg);
    }
}
async function fetchLatestVersion(token) {
    const octokit = github.getOctokit(token);
    const { data } = await octokit.rest.repos.listReleases({ owner: 'neovim', repo: 'neovim' });
    const re = /^v\d+\.\d+\.\d+$/;
    for (const release of data) {
        const tagName = release.tag_name;
        if (re.test(tagName)) {
            core.debug(`Detected the latest stable version '${tagName}'`);
            return tagName;
        }
    }
    core.debug(`No stable version was found in releases: ${JSON.stringify(data, null, 2)}`);
    throw new Error(`No stable version was found in ${data.length} releases`);
}
// Download stable asset from 'stable' release. When the asset is not found, get the latest version
// using GitHub API and retry downloading an asset with the version as fallback (#5).
async function downloadStableNeovim(os, token = null) {
    try {
        return await downloadNeovim('stable', os); // `await` is necessary to catch excetipn
    }
    catch (e) {
        const err = (0, utils_1.ensureError)(e);
        if (err.message.includes('Downloading asset failed:') && token !== null) {
            core.warning(`Could not download stable asset. Detecting the latest stable release from GitHub API as fallback: ${err.message}`);
            const ver = await fetchLatestVersion(token);
            core.warning(`Fallback to install asset from '${ver}' release`);
            return downloadNeovim(ver, os);
        }
        throw err;
    }
}
// Build nightly Neovim from sources as fallback of downloading nightly assets from the nightly release page of
// neovim/neovim repository (#18).
// https://github.com/neovim/neovim/wiki/Building-Neovim
async function buildNightlyNeovim(os) {
    core.debug(`Installing Neovim by building from source on ${os}`);
    switch (os) {
        case 'linux':
            core.debug('Installing build dependencies via apt');
            await (0, shell_1.exec)('sudo', [
                'apt-get',
                'install',
                '-y',
                '--no-install-recommends',
                'ninja-build',
                'gettext',
                'libtool',
                'libtool-bin',
                'autoconf',
                'automake',
                'cmake',
                'g++',
                'pkg-config',
                'unzip',
                'curl',
            ]);
            break;
        case 'macos':
            core.debug('Installing build dependencies via Homebrew');
            await (0, shell_1.exec)('brew', ['install', 'ninja', 'libtool', 'automake', 'cmake', 'pkg-config', 'gettext', 'curl']);
            break;
        default:
            throw new Error(`Building Neovim from soruce is not supported for ${os} platform`);
    }
    // Add -nightly suffix since building stable Neovim from source may be supported in the future
    const installDir = path.join((0, os_1.homedir)(), 'nvim-nightly');
    core.debug(`Building and installing Neovim to ${installDir}`);
    const dir = path.join(await (0, utils_1.makeTmpdir)(), 'build-nightly-neovim');
    await (0, shell_1.exec)('git', ['clone', '--depth=1', 'https://github.com/neovim/neovim.git', dir]);
    const opts = { cwd: dir };
    const makeArgs = ['-j', `CMAKE_EXTRA_FLAGS=-DCMAKE_INSTALL_PREFIX=${installDir}`, 'CMAKE_BUILD_TYPE=RelWithDebug'];
    await (0, shell_1.exec)('make', makeArgs, opts);
    core.debug(`Built Neovim in ${opts.cwd}. Installing it via 'make install'`);
    await (0, shell_1.exec)('make', ['install'], opts);
    core.debug(`Installed Neovim to ${installDir}`);
    return {
        executable: (0, utils_1.exeName)(true, os),
        binDir: path.join(installDir, 'bin'),
    };
}
//# sourceMappingURL=neovim.js.map
