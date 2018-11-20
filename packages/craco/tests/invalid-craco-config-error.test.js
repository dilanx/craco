const { InvalidCracoConfigError } = require("../lib/errors");

test("InvalidCracoConfigError with all the options", () => {
    function throwError() {
        throw new InvalidCracoConfigError("Malformed plugin at index: 1 of plugins");
    }

    expect(throwError).toThrowError(
        `Malformed plugin at index: 1 of plugins\n\n` +
            `This error probably occurred because you updated @craco/craco.\n` +
            "Please validate that your craco.config.js file follow the latest version of the documentation\n\n" +
            "   * https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview\n\n" +
            "You can also look at the changelog for any breaking changes\n\n" +
            "   * https://github.com/sharegate/craco/tree/master/changelog\n\n" +
            `If that doesn't work, @craco/craco needs to be fixed.\n` +
            `Please check to see if there's already an issue in the sharegate/craco repo:\n\n` +
            `   * https://github.com/sharegate/craco/issues?q=is%3Aissue\n\n` +
            "If not, please open an issue and we'll take a look. (Or you can send a PR!)\n"
    );
});
