import type { ProxyConfigArray } from 'webpack-dev-server';

export interface CraPaths {
    dotenv: string;
    appPath: string;
    appBuild: string;
    appPublic: string;
    appHtml: string;
    appIndexJs: string;
    appPackageJson: string;
    appSrc: string;
    appTsConfig: string;
    appJsConfig: string;
    yarnLockFile: string;
    testsSetup: string;
    proxySetup: string;
    appNodeModules: string;
    swSrc: string;
    publicUrlOrPath: string;
    ownPath: string;
    ownNodeModules: string;
    appTypeDeclarations: string;
    ownTypeDeclarations: string;
    moduleFileExtensions: string[];
}

export interface BaseContext {
    env?: string;
    paths?: CraPaths;
}

export type WebpackContext = BaseContext;

export interface DevServerContext extends BaseContext {
    proxy?: ProxyConfigArray;
    allowedHost?: string;
}

export interface JestContext extends BaseContext {
    resolve?: (id: string) => string;
    rootDir?: string;
}
