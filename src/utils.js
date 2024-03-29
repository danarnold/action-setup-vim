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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureError = exports.exeName = exports.getOs = exports.makeTmpdir = void 0;
const os_1 = require("os");
const core = __importStar(require("@actions/core"));
const io_1 = require("@actions/io");
async function makeTmpdir() {
    const dir = (0, os_1.tmpdir)();
    await (0, io_1.mkdirP)(dir);
    core.debug(`Created temporary directory ${dir}`);
    return dir;
}
exports.makeTmpdir = makeTmpdir;
function getOs() {
    switch (process.platform) {
        case 'darwin':
            return 'macos';
        case 'linux':
            return 'linux';
        case 'win32':
            return 'windows';
        default:
            throw new Error(`Platform '${process.platform}' is not supported`);
    }
}
exports.getOs = getOs;
function exeName(isNeovim, os) {
    if (os === 'windows') {
        return isNeovim ? 'nvim.exe' : 'vim.exe';
    }
    else {
        return isNeovim ? 'nvim' : 'vim';
    }
}
exports.exeName = exeName;
function ensureError(err) {
    if (err instanceof Error) {
        return err;
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return new Error(`Unknown fatal error: ${err}`);
}
exports.ensureError = ensureError;
//# sourceMappingURL=utils.js.map