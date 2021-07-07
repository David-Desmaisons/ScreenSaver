const {
  localProviderOption
} = require("./model/contract");
const {
  getConfiguration,
  setConfiguration
} = require("./core/configuration");
const Boom = require("@hapi/boom");

function addRoutes() {
  return [{
      path: "options",
      method: "GET",
      options: {
        tags: ["api"],
        response: {
          schema: localProviderOption,
        },
        handler() {
          return getConfiguration();
        },
      },
    },
    {
      path: "options",
      method: "POST",
      options: {
        tags: ["api"],
        response: {
          schema: localProviderOption,
        },
        validate: {
          payload: localProviderOption,
        },
        async handler(request) {
          try {
            await setConfiguration(request.payload);
            return getConfiguration();
          } catch {
            throw Boom.badRequest();
          }
        },
      },
    },
    {
      method: 'GET',
      path: 'images/{param*}',
      handler: {
        directory: {
          path: getConfiguration().rootDirectory
        }
      }
    }
  ];
}

module.exports = {
  addRoutes,
};