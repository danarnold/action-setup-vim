<a name="v1.2.14"></a>
# [v1.2.14](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.14) - 09 Jan 2023

- Improve warning message when trying to build Vim older than 8.2.1119 on `macos-latest` or `macos-12` runner since the build would fail. `macos-11` runner should be used instead.
  - Vim older than 8.2.1119 can be built with Xcode 11 or earlier only. `macos-12` runner does not include Xcode 11 by default. And now `macos-latest` label points to `macos-12` runner. So building Vim 8.2.1119 or older on `macos-latest` would fail.
- Update dependencies to fix deprecation warning from `uuid` package

[Changes][v1.2.14]


<a name="v1.2.13"></a>
# [v1.2.13](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.13) - 13 Oct 2022

- Update `@actions/core` to v1.10.0 to follow the change that [GitHub deprecated `set-output` command](https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/) recently.
- Update other dependencies including `@actions/github` v5.1.1

[Changes][v1.2.13]


<a name="v1.2.12"></a>
# [v1.2.12](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.12) - 21 Jul 2022

- Fix the Neovim asset directory name for macOS has been changed from `nvim-osx64` to `nvim-macos` at Neovim v0.7.1. (thanks [@notomo](https://github.com/notomo), [#22](https://github.com/rhysd/action-setup-vim/issues/22))
- Update dependencies including `@actions/core` v1.9.0 and `@actions/github` v5.0.3.

[Changes][v1.2.12]


<a name="v1.2.11"></a>
# [v1.2.11](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.11) - 15 Apr 2022

- Fix installing `stable` or `v0.7.0` Neovim on Windows runner. The asset directory name was changed from 'Neovim' to 'nvim-win64' at v0.7.0 and the change broke this action.

[Changes][v1.2.11]


<a name="v1.2.10"></a>
# [v1.2.10](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.10) - 23 Mar 2022

- Fix installing nightly Neovim on Windows. (thanks [@notomo](https://github.com/notomo), [#20](https://github.com/rhysd/action-setup-vim/issues/20) [#21](https://github.com/rhysd/action-setup-vim/issues/21))
- Update dependencies to the latest. (including new `@actions/exec` and `@actions/io`)

[Changes][v1.2.10]


<a name="v1.2.9"></a>
# [v1.2.9](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.9) - 05 Feb 2022

- Use `node16` runner to run this action.
- Update dependencies. Now TypeScript source compiles to ES2021 code since Node.js v16 supports all ES2021 features.

[Changes][v1.2.9]


<a name="v1.2.8"></a>
# [v1.2.8](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.8) - 02 Oct 2021

- Installing Neovim nightly now fallbacks to building from source when downloading assets failed (thanks [@glacambre](https://github.com/glacambre), [#18](https://github.com/rhysd/action-setup-vim/issues/18), [#9](https://github.com/rhysd/action-setup-vim/issues/9))
  - This fallback logic is currently only for Linux and macOS
  - This fallback happens when [the release workflow](https://github.com/neovim/neovim/actions/workflows/release.yml) of [neovim/neovim](https://github.com/neovim/neovim) failed to update [the nightly release page](https://github.com/neovim/neovim/tree/nightly)
- Update many dependencies including all `@actions/*` packages and TypeScript compiler
- Now multiple versions of Vim/Neovim can be installed within the same job. Previously, Vim/Neovim installed via release archives or built from source were installed in `~/vim`/`~/nvim`. It meant that trying to install multiple versions caused a directory name conflict. Now they are installed in `~/vim-{ver}`/`~/nvim-{ver}` (e.g. `~/vim-v8.2.1234`, `~/nvim-nightly`) so that the conflict no longer happens.

[Changes][v1.2.8]


<a name="v1.2.7"></a>
# [v1.2.7](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.7) - 05 Feb 2021

- Fix: Installing stable Vim on `ubuntu-20.04` worker. `vim-gnome` was removed at Ubuntu 19.10. In the case, this action installs `vim-gtk3` instead. The worker is now used for `ubuntu-latest` also. ([#11](https://github.com/rhysd/action-setup-vim/issues/11))
- Improve: Better error message on an invalid value for `version` input
- Improve: Update dependencies

[Changes][v1.2.7]


<a name="v1.2.6"></a>
# [v1.2.6](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.6) - 15 Nov 2020

- Fix: Build failed on building Vim older than v8.2.1119 on macOS worker. Now Vim before v8.2.1119 is built with Xcode11 since it cannot be built with Xcode12. ([#10](https://github.com/rhysd/action-setup-vim/issues/10))
- Improve: Update dependencies

[Changes][v1.2.6]


<a name="v1.2.5"></a>
# [v1.2.5](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.5) - 02 Oct 2020

- Fix: Update `@actions/core` for security patch
- Improve: Internal refactoring
- Improve: Update dependencies

[Changes][v1.2.5]


<a name="v1.2.4"></a>
# [v1.2.4](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.4) - 08 Sep 2020

- Improve: When an asset for stable Neovim in `stable` release is not found, fallback to the latest version release by detecting the latest version via GitHub API. API token will be given via `token` input. You don't need to set it because it is set automatically. ([#5](https://github.com/rhysd/action-setup-vim/issues/5))
- Improve: Update dependencies to the latest

[Changes][v1.2.4]


<a name="v1.2.3"></a>
# [v1.2.3](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.3) - 29 Mar 2020

- Fix: Run `apt update` before `apt install` on installing stable Vim on Linux. `apt install vim-gnome` caused an error without this

[Changes][v1.2.3]


<a name="v1.2.2"></a>
# [v1.2.2](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.2) - 22 Feb 2020

- Improve: Better error message when no asset is found on installing Neovim

[Changes][v1.2.2]


<a name="v1.2.1"></a>
# [v1.2.1](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.1) - 15 Feb 2020

- Improve: Validate the executable file before getting `--version` output

[Changes][v1.2.1]


<a name="v1.2.0"></a>
# [v1.2.0](https://github.com/rhysd/action-setup-vim/releases/tag/v1.2.0) - 02 Feb 2020

- Improve: `github-token` input was removed since it is no longer necessary. This is not a breaking change since `github-token` input is now simply ignored.
  - GitHub API token was used only for getting the latest release of vim-win32-installer repository on Windows. But now the latest release is detected from redirect URL.

[Changes][v1.2.0]


<a name="v1.1.3"></a>
# [v1.1.3](https://github.com/rhysd/action-setup-vim/releases/tag/v1.1.3) - 31 Jan 2020

- Fix: `version` input check was not correct for Vim 7.x (e.g. `7.4.100`, `7.4`). [Thanks @itchyny!](https://github.com/rhysd/action-setup-vim/pull/1)
- Fix: Path separator was not correct on Windows
- Improve: Better post-action validation on CI and internal refactoring

[Changes][v1.1.3]


<a name="v1.1.2"></a>
# [v1.1.2](https://github.com/rhysd/action-setup-vim/releases/tag/v1.1.2) - 31 Jan 2020

- Fix: GitHub API call may fail relying on IP address of the worker (ref: [actions/setup-go#16](https://github.com/actions/setup-go/issues/16))

[Changes][v1.1.2]


<a name="v1.1.1"></a>
# [v1.1.1](https://github.com/rhysd/action-setup-vim/releases/tag/v1.1.1) - 31 Jan 2020

- Improve: `github-token` input is now optional even if you install Vim on Windows worker
- Improve: Update dev-dependencies

[Changes][v1.1.1]


<a name="v1.1.0"></a>
# [v1.1.0](https://github.com/rhysd/action-setup-vim/releases/tag/v1.1.0) - 29 Jan 2020

- New: Specific version tag can be set to `version` input like `version: v8.2.0126`. Please read [documentation](https://github.com/rhysd/action-setup-vim#readme) for more details.

[Changes][v1.1.0]


<a name="v1.0.2"></a>
# [v1.0.2](https://github.com/rhysd/action-setup-vim/releases/tag/v1.0.2) - 28 Jan 2020

- Improve: Now all input environment variables (starting with `INPUT_`) are filtered on executing subprocesses ([actions/toolkit#309](https://github.com/actions/toolkit/issues/309))
- Improve: Unit tests were added for validation of inputs and outputs
- Improve: Better validation error messages
- Improve: Better descriptions in README.md

[Changes][v1.0.2]


<a name="v1.0.1"></a>
# [v1.0.1](https://github.com/rhysd/action-setup-vim/releases/tag/v1.0.1) - 25 Jan 2020

- Improve: Install stable Neovim with Homebrew on macOS. Now it is installed via `brew install neovim`

[Changes][v1.0.1]


<a name="v1.0.0"></a>
# [v1.0.0](https://github.com/rhysd/action-setup-vim/releases/tag/v1.0.0) - 24 Jan 2020

First release :tada:

Please read [README.md](https://github.com/rhysd/action-setup-vim#readme) for usage.

[Changes][v1.0.0]


[v1.2.14]: https://github.com/rhysd/action-setup-vim/compare/v1.2.13...v1.2.14
[v1.2.13]: https://github.com/rhysd/action-setup-vim/compare/v1.2.12...v1.2.13
[v1.2.12]: https://github.com/rhysd/action-setup-vim/compare/v1.2.11...v1.2.12
[v1.2.11]: https://github.com/rhysd/action-setup-vim/compare/v1.2.10...v1.2.11
[v1.2.10]: https://github.com/rhysd/action-setup-vim/compare/v1.2.9...v1.2.10
[v1.2.9]: https://github.com/rhysd/action-setup-vim/compare/v1.2.8...v1.2.9
[v1.2.8]: https://github.com/rhysd/action-setup-vim/compare/v1.2.7...v1.2.8
[v1.2.7]: https://github.com/rhysd/action-setup-vim/compare/v1.2.6...v1.2.7
[v1.2.6]: https://github.com/rhysd/action-setup-vim/compare/v1.2.5...v1.2.6
[v1.2.5]: https://github.com/rhysd/action-setup-vim/compare/v1.2.4...v1.2.5
[v1.2.4]: https://github.com/rhysd/action-setup-vim/compare/v1.2.3...v1.2.4
[v1.2.3]: https://github.com/rhysd/action-setup-vim/compare/v1.2.2...v1.2.3
[v1.2.2]: https://github.com/rhysd/action-setup-vim/compare/v1.2.1...v1.2.2
[v1.2.1]: https://github.com/rhysd/action-setup-vim/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/rhysd/action-setup-vim/compare/v1.1.3...v1.2.0
[v1.1.3]: https://github.com/rhysd/action-setup-vim/compare/v1.1.2...v1.1.3
[v1.1.2]: https://github.com/rhysd/action-setup-vim/compare/v1.1.1...v1.1.2
[v1.1.1]: https://github.com/rhysd/action-setup-vim/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/rhysd/action-setup-vim/compare/v1.0.2...v1.1.0
[v1.0.2]: https://github.com/rhysd/action-setup-vim/compare/v1.0.1...v1.0.2
[v1.0.1]: https://github.com/rhysd/action-setup-vim/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/rhysd/action-setup-vim/tree/v1.0.0

<!-- Generated by https://github.com/rhysd/changelog-from-release v3.5.1 -->
