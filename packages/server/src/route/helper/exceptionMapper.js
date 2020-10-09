const {
    ProviderNotFound
} = require("../../core/providerNotFound");
const Boom = require("@hapi/boom");

async function exceptionMapper(callback) {
    try {
        return await callback();
    } catch (error) {
        if (error instanceof ProviderNotFound) {
            throw Boom.notFound(error.getMessage());
        }
        throw error;
    }
}

module.exports = {
    exceptionMapper
}