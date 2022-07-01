"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwUnexpectedConfigError = exports.gitHubIssueUrl = void 0;
function gitHubIssueUrl(repo, query) {
    return "https://github.com/".concat(repo, "/issues?q=is%3Aissue").concat(query ? "+".concat(query) : '');
}
exports.gitHubIssueUrl = gitHubIssueUrl;
function showNpmPackageUrl(packageName) {
    return "\n   * https://www.npmjs.com/package/".concat(packageName, "\n\n");
}
function showGitHubIssueUrl(repo, query) {
    return ("Please check to see if there's already an issue in the ".concat(repo, " repo:\n\n") +
        "   * ".concat(gitHubIssueUrl(repo, query), "\n\n") +
        "If not, please open an issue and we'll take a look. (Or you can send a PR!)\n\n");
}
function showPackageUpdateInstructions(packageName, repo, query) {
    return ("Please try updating ".concat(packageName, " to the latest version:\n\n") +
        "   $ yarn upgrade ".concat(packageName, "\n\n") +
        'Or:\n\n' +
        "   $ npm update ".concat(packageName, "\n\n") +
        "If that doesn't work, ".concat(packageName, " needs to be fixed to support the latest version.\n") +
        (repo
            ? showGitHubIssueUrl(repo, query)
            : showNpmPackageUrl(packageName)));
}
function throwUnexpectedConfigError(_a) {
    var message = _a.message, packageName = _a.packageName, repo = _a.githubRepo, query = _a.githubIssueQuery;
    throw new Error("".concat(message, "\n\n") +
        'This error probably occurred because you updated react-scripts or craco. ' +
        (packageName
            ? showPackageUpdateInstructions(packageName, repo, query)
            : 'You will need to update this plugin to work with the latest version.\n\n') +
        'You might also want to look for related issues in the ' +
        'craco and create-react-app repos:\n\n' +
        "   * ".concat(gitHubIssueUrl('sharegate/craco', query), "\n") +
        "   * ".concat(gitHubIssueUrl('facebook/create-react-app', query), "\n"));
}
exports.throwUnexpectedConfigError = throwUnexpectedConfigError;
