const {
    providersModel,
} = require("../model/contract");

const getProviders = ({providers}) => ({
    method: "GET",
    options: {
        tags: ["api"],
        response: {
            schema: providersModel
        },
        handler() {
            return providers.map(({
                name,
                version,
                description
            }) => ({
                name,
                version,
                description,
            }));
        },
    },
});

module.exports = {
    getProviders
}