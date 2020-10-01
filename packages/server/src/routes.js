const { responseModel, wallPaperQuery } = require("./model/contract");
const { Finder } = require("./core/wallpaperFinder");
const { loadProviders } = require("./core/loader");
const Chance = require('chance');

async function createFinder(){
  const providers = await loadProviders();
  const finder = new Finder(providers, new Chance());
  return finder;
}

const routesProvider = async () => {
  const finder = await createFinder();
  return [
    {
      method: "GET",
      path: "/wallpaper",
      options: {
        tags: ["api"],
        response: { schema: responseModel },
        validate: {
          query: wallPaperQuery,
        },
        handler(request, h) {
          return finder.getWallpaper(request.query);
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
