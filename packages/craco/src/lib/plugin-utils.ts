interface ConfigError {
  message: string;
  packageName?: string;
  githubRepo?: string;
  githubIssueQuery?: string;
}

export function gitHubIssueUrl(repo: string, query?: string) {
  return `https://github.com/${repo}/issues?q=is%3Aissue${
    query ? `+${query}` : ''
  }`;
}

function showNpmPackageUrl(packageName: string) {
  return `\n   * https://www.npmjs.com/package/${packageName}\n\n`;
}

function showGitHubIssueUrl(repo: string, query?: string) {
  return (
    `Please check to see if there's already an issue in the ${repo} repo:\n\n` +
    `   * ${gitHubIssueUrl(repo, query)}\n\n` +
    "If not, please open an issue and we'll take a look. (Or you can send a PR!)\n\n"
  );
}

function showPackageUpdateInstructions(
  packageName: string,
  repo?: string,
  query?: string
) {
  return (
    `Please try updating ${packageName} to the latest version:\n\n` +
    `   $ yarn upgrade ${packageName}\n\n` +
    'Or:\n\n' +
    `   $ npm update ${packageName}\n\n` +
    `If that doesn't work, ${packageName} needs to be fixed to support the latest version.\n` +
    (repo ? showGitHubIssueUrl(repo, query) : showNpmPackageUrl(packageName))
  );
}

export function throwUnexpectedConfigError({
  message,
  packageName,
  githubRepo: repo,
  githubIssueQuery: query,
}: ConfigError) {
  throw new Error(
    `${message}\n\n` +
      'This error probably occurred because you updated react-scripts or craco. ' +
      (packageName
        ? showPackageUpdateInstructions(packageName, repo, query)
        : 'You will need to update this plugin to work with the latest version.\n\n') +
      'You might also want to look for related issues in the ' +
      'craco and create-react-app repos:\n\n' +
      `   * ${gitHubIssueUrl('dilanx/craco', query)}\n` +
      `   * ${gitHubIssueUrl('facebook/create-react-app', query)}\n`
  );
}
