const REACT_SCRIPTS_PACKAGE_NAME = "react-scripts";
const CRACO_PACKAGE_NAME = "@craco/craco";
const CRACO_GITHUB_REPO = "sharegate/craco";

function gitHubIssueUrl(repo, query) {
    return `https://github.com/${repo}/issues?q=is%3Aissue${query ? `+${query}` : ""}`;
}

class UnexpectedCreateReactAppConfigError extends Error {
    constructor(message, githubIssueQuery) {
        super();

        this.message =
            `${message}\n\n` +
            `This error probably occurred because you updated ${REACT_SCRIPTS_PACKAGE_NAME} or ${CRACO_PACKAGE_NAME}.\n` +
            `Please try updating ${REACT_SCRIPTS_PACKAGE_NAME} or ${CRACO_PACKAGE_NAME} to the latest version:\n\n` +
            `   $ yarn upgrade ${REACT_SCRIPTS_PACKAGE_NAME} ${CRACO_PACKAGE_NAME}\n\n` +
            `Or:\n\n` +
            `   $ npm update ${REACT_SCRIPTS_PACKAGE_NAME} ${CRACO_PACKAGE_NAME}\n\n` +
            `If that doesn't work, ${CRACO_PACKAGE_NAME} needs to be fixed to support the latest version of ${REACT_SCRIPTS_PACKAGE_NAME}.\n` +
            `Please check to see if there's already an issue in the ${CRACO_GITHUB_REPO} repo:\n\n` +
            `   * ${gitHubIssueUrl(CRACO_GITHUB_REPO, githubIssueQuery)}\n\n` +
            "If not, please open an issue and we'll take a look. (Or you can send a PR!)\n\n" +
            "You might also want to look for related issues in the create-react-app repo\n\n" +
            `   * ${gitHubIssueUrl("facebook/create-react-app", githubIssueQuery)}\n`;
    }
}

class InvalidCracoConfigError extends Error {
    constructor(message) {
        super();

        this.message =
            `${message}\n\n` +
            `This error probably occurred because you updated ${CRACO_PACKAGE_NAME}.\n` +
            "Please validate that your craco.config.js file follow the latest version of the documentation\n\n" +
            "   * https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview\n\n" +
            "You can also look at the changelog for any breaking changes\n\n" +
            "   * https://github.com/sharegate/craco/tree/master/changelog\n\n" +
            `If that doesn't work, ${CRACO_PACKAGE_NAME} needs to be fixed.\n` +
            `Please check to see if there's already an issue in the ${CRACO_GITHUB_REPO} repo:\n\n` +
            `   * ${gitHubIssueUrl(CRACO_GITHUB_REPO)}\n\n` +
            "If not, please open an issue and we'll take a look. (Or you can send a PR!)\n";
    }
}

module.exports = {
    UnexpectedCreateReactAppConfigError,
    InvalidCracoConfigError
};
