import type { ConfigError } from '../types/plugin-utils';
export declare function gitHubIssueUrl(repo: string, query?: string): string;
export declare function throwUnexpectedConfigError({ message, packageName, githubRepo: repo, githubIssueQuery: query, }: ConfigError): void;
