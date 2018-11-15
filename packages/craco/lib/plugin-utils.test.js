const { throwUnexpectedConfigError } = require("./plugin-utils");

test("throwUnexpectedConfigError with all the options", () => {
    function throwError() {
        throwUnexpectedConfigError({
            message: "Can't find file-loader in the webpack config!",
            packageName: "craco-less",
            githubRepo: "ndbroadbent/craco-less",
            githubIssueQuery: "webpack+file-loader"
        });
    }
    expect(throwError).toThrowError(
        "Can't find file-loader in the webpack config!\n\n" +
            "This error probably occurred because you updated react-scripts or craco. " +
            "Please try updating craco-less to the latest version:\n\n" +
            "   $ yarn upgrade craco-less\n\n" +
            "Or:\n\n" +
            "   $ npm update craco-less\n\n" +
            "If that doesn't work, craco-less needs to be fixed to support the latest version.\n" +
            "Please check to see if there's already an issue in the ndbroadbent/craco-less repo:\n\n" +
            "   * https://github.com/ndbroadbent/craco-less/issues?q=is%3Aissue+webpack+file-loader\n\n" +
            "If not, please open an issue and we'll take a look. (Or you can send a PR!)\n\n" +
            "You might also want to look for related issues in the " +
            "craco and create-react-app repos:\n\n" +
            "   * https://github.com/sharegate/craco/issues?q=is%3Aissue+webpack+file-loader\n" +
            "   * https://github.com/facebook/create-react-app/issues?q=is%3Aissue+webpack+file-loader\n"
    );
});

test("throwUnexpectedConfigError with message, packageName, and githubRepo", () => {
    function throwError() {
        throwUnexpectedConfigError({
            message: "Can't find file-loader in the webpack config!",
            packageName: "craco-less",
            githubRepo: "ndbroadbent/craco-less"
        });
    }
    expect(throwError).toThrowError(
        "Can't find file-loader in the webpack config!\n\n" +
            "This error probably occurred because you updated react-scripts or craco. " +
            "Please try updating craco-less to the latest version:\n\n" +
            "   $ yarn upgrade craco-less\n\n" +
            "Or:\n\n" +
            "   $ npm update craco-less\n\n" +
            "If that doesn't work, craco-less needs to be fixed to support the latest version.\n" +
            "Please check to see if there's already an issue in the ndbroadbent/craco-less repo:\n\n" +
            "   * https://github.com/ndbroadbent/craco-less/issues?q=is%3Aissue\n\n" +
            "If not, please open an issue and we'll take a look. (Or you can send a PR!)\n\n" +
            "You might also want to look for related issues in the " +
            "craco and create-react-app repos:\n\n" +
            "   * https://github.com/sharegate/craco/issues?q=is%3Aissue\n" +
            "   * https://github.com/facebook/create-react-app/issues?q=is%3Aissue\n"
    );
});

test("throwUnexpectedConfigError with message and packageName", () => {
    function throwError() {
        throwUnexpectedConfigError({
            message: "Can't find file-loader in the webpack config!",
            packageName: "craco-less"
        });
    }
    expect(throwError).toThrowError(
        "Can't find file-loader in the webpack config!\n\n" +
            "This error probably occurred because you updated react-scripts or craco. " +
            "Please try updating craco-less to the latest version:\n\n" +
            "   $ yarn upgrade craco-less\n\n" +
            "Or:\n\n" +
            "   $ npm update craco-less\n\n" +
            "If that doesn't work, craco-less needs to be fixed to support the latest version.\n\n" +
            "   * https://www.npmjs.com/package/craco-less\n\n" +
            "You might also want to look for related issues in the " +
            "craco and create-react-app repos:\n\n" +
            "   * https://github.com/sharegate/craco/issues?q=is%3Aissue\n" +
            "   * https://github.com/facebook/create-react-app/issues?q=is%3Aissue\n"
    );
});

test("throwUnexpectedConfigError with message and githubIssueQuery", () => {
    function throwError() {
        throwUnexpectedConfigError({
            message: "Can't find file-loader in the webpack config!",
            githubIssueQuery: "webpack+file-loader"
        });
    }
    expect(throwError).toThrowError(
        "Can't find file-loader in the webpack config!\n\n" +
            "This error probably occurred because you updated react-scripts or craco. " +
            "You will need to update this plugin to work with the latest version.\n\n" +
            "You might also want to look for related issues in the " +
            "craco and create-react-app repos:\n\n" +
            "   * https://github.com/sharegate/craco/issues?q=is%3Aissue+webpack+file-loader\n" +
            "   * https://github.com/facebook/create-react-app/issues?q=is%3Aissue+webpack+file-loader\n"
    );
});
