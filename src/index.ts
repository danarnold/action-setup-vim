import * as core from '@actions/core';
import { loadConfigFromInputs } from './config';
import { install } from './install';
import { validateInstallation } from './validate';

async function main() {
    const config = loadConfigFromInputs();
    console.log('Extracted configuration:', config);

    const pathSep = process.platform === 'win32' ? ';' : ':';
    const installed = await install(config);
    console.log(`::set-env name=PATH::${installed.bin}${pathSep}${process.env.PATH}`);
    core.debug(`'${installed.bin}' was set to $PATH`);

    await validateInstallation(installed);

    core.setOutput('executable', installed.executable);
    console.log('Installation successfully done:', installed);
}

main().catch(e => {
    core.debug(e.stack);
    core.setFailed(e.message);
});
