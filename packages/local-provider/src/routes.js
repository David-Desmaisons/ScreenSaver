const {
  localProviderOption,
  imageInformation,
  imageResult
} = require("./model/contract");
const {
  getConfiguration,
  setConfiguration
} = require("./core/configuration");
const {
  saveImages
} = require("./core/images");
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
    },
    {
      path: "images",
      method: "POST",
      options: {
        tags: ["api"],
        response: {
          schema: imageResult,
        },
        validate: {
          payload: imageInformation,
        },
        async handler(request) {
          try {
            const {
              payload: {
                path
              },
              url: {
                origin: host
              }
            } = request;
            await saveImages({
              url: path,
              host
            });
            return {
              success: true
            };
          } catch {
            throw Boom.badRequest();
          }
        },
      },
    }
  ];
}

module.exports = {
  addRoutes,
};