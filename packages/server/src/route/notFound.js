const Boom = require("@hapi/boom");

const notFound = {
    method: "*",
    handler(request) {
        console.log(`route: "${request.params.any}" not found`);
        throw Boom.notFound("Resource Not Found!");
    },
};

module.exports = {
    notFound
}