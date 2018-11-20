const { UnexpectedCreateReactAppConfigError } = require("../lib/errors");

test("UnexpectedCreateReactAppConfigError with all the options", () => {
    function throwError() {
        throw new UnexpectedCreateReactAppConfigError(
            "Can't find file-loader in the webpack config!",
            "webpack+file-loader"
        );
    }

    expect(throwError).toThrowError(
        "Can't find file-loader in the webpack config!\n\n" +
            "This error probably occurred because you updated react-scripts or @craco/craco.\n" +
            "Please try updating react-scripts or @craco/craco to the latest version:\n\n" +
            "   $ yarn upgrade react-scripts @craco/craco\n\n" +
            "Or:\n\n" +
            "   $ npm update react-scripts @craco/craco\n\n" +
            "If that doesn't work, @craco/craco needs to be fixed to support the latest version of react-scripts.\n" +
            "Please check to see if there's already an issue in the sharegate/craco repo:\n\n" +
            "   * https://github.com/sharegate/craco/issues?q=is%3Aissue+webpack+file-loader\n\n" +
            "If not, please open an issue and we'll take a look. (Or you can send a PR!)\n\n" +
            "You might also want to look for related issues in the create-react-app repo\n\n" +
            "   * https://github.com/facebook/create-react-app/issues?q=is%3Aissue+webpack+file-loader\n"
    );
});
