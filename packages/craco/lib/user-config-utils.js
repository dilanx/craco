function when(condition, fct) {
    if (condition) {
        return fct();
    }

    return undefined;
}

function whenDev(fct) {
    return when(process.env.NODE_ENV === "development", fct);
}

function whenProd(fct) {
    return when(process.env.NODE_ENV === "production", fct);
}

module.exports = {
    when,
    whenDev,
    whenProd
};
