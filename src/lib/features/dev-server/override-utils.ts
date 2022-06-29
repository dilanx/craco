import { CracoConfig } from '../../../types/config';
import { loadDevServerUtils, overrideDevServerUtils } from '../../cra';
import { log } from '../../logger';

function overrideWebpackCompilerToDisableTypeScriptTypeChecking(
    craDevServersUtils: any
) {
    if (craDevServersUtils.createCompiler) {
        const craCreateCompiler = craDevServersUtils.createCompiler;

        craDevServersUtils.createCompiler = (args: any) => {
            const newArgs = {
                ...args,
                useTypeScript: false,
            };

            return craCreateCompiler(newArgs);
        };

        log('Overrided Webpack compiler to disable TypeScript type checking.');
    }

    return craDevServersUtils;
}

function overrideUtils(cracoConfig: CracoConfig) {
    if (cracoConfig.typescript) {
        const { enableTypeChecking } = cracoConfig.typescript;

        if (enableTypeChecking === false) {
            const craDevServersUtils = loadDevServerUtils();
            const resultingDevServersUtils =
                overrideWebpackCompilerToDisableTypeScriptTypeChecking(
                    craDevServersUtils
                );

            overrideDevServerUtils(resultingDevServersUtils);
        }
    }
}

export { overrideUtils as overrideDevServerUtils };
