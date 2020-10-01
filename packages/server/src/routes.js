const { wallPaperModel, providerModel, wallPaperQuery } = require("./model/contract");
const { Finder } = require("./core/wallpaperFinder");
const { loadProviders } = require("./core/loader");
const Chance = require('chance');

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
          return finder.getWallpaper(request.query);
        },
      },
    },
    {
      method: "GET",
      path: "/providers",
      options: {
        tags: ["api"],
        response: { schema: providerModel },
        handler() {
          return providers.map(p => p.name);
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
