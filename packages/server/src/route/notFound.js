const Boom = require("@hapi/boom");

const getNotFound = ({ logger }) => ({
  method: "*",
  handler(request) {
    logger.log(`route: "${request.params.any}" not found`);
    throw Boom.notFound("Resource Not Found!");
  },
});

module.exports = {
  getNotFound,
};
