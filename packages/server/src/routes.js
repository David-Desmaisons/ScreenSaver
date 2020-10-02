const { wallPaperModel, providersModel, wallPaperQuery } = require("./model/contract");
const { Finder } = require("./core/wallpaperFinder");
const { loadProviders } = require("./core/loader");
const Chance = require('chance');
const { ProviderNotFound } = require("./core/providerNotFound");

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
        handler(request, h) {
          try {
            return finder.getWallpaper(request.query);
          }
          catch(error){
            if (error instanceof ProviderNotFound){
               return h.response(error.getMessage()).code(404);
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
          return providers.map(({name, version}) => ({name, version}));
        },
      },
    },
    {
      method: "*",
      path: "/{any*}",
      handler(_, h) {
        return h.response("Resource Not Found!").code(404);
      },
    },
  ];
};

module.exports = {
  routesProvider,
};
