const {
  wallPaperModel,
  providersModel,
  wallPaperQuery,
} = require("./model/contract");
const { Finder } = require("./core/wallpaperFinder");
const { loadProviders } = require("./core/loader");
const Chance = require("chance");
const { ProviderNotFound } = require("./core/providerNotFound");
const Boom = require("@hapi/boom");

const routesProvider = async () => {
  const providers = await loadProviders();
  const finder = new Finder(providers, new Chance());
  return [
    {
      method: "GET",
      path: "/wallpaper",
      options: {
        tags: ["api"],
        response: { schema: wallPaperModel },
        validate: {
          query: wallPaperQuery,
        },
        async handler(request) {
          try {
            return await finder.getWallpaper(request.query);
          } catch (error) {
            if (error instanceof ProviderNotFound) {
              throw Boom.notFound(error.getMessage());
            }
            throw error;
          }
        },
      },
    },
    {
      method: "GET",
      path: "/providers",
      options: {
        tags: ["api"],
        response: { schema: providersModel },
        handler() {
          return providers.map(({ name, version, description }) => ({ name, version, description }));
        },
      },
    },
    {
      method: "*",
      path: "/{any*}",
      handler(request) {
        console.log(`route: ${request.params.any} not found`);
        throw Boom.notFound("Resource Not Found!");
      },
    },
  ];
};

module.exports = {
  routesProvider,
};
