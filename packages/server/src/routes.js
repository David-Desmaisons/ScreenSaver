const { responseModel, wallPaperQuery } = require("./model/contract");

const routes = [
  {
    method: "GET",
    path: "/wallpaper",
    options: {
      tags: ["api"],
      response: { schema: responseModel },
      validate:{
        query: wallPaperQuery
      },
      handler: (request, h) => {
        return {
          url:
            "https://lh4.googleusercontent.com/-9n3C3hJmGGc/UQmHUE2y6RI/AAAAAAAAgu8/08oNF_dL83w/s2560/IMG_1311.jpg",
          description: "IMG-1311.jpg",
          photographer: "Grzegorz Głowaty",
          provider: "chromeCast",
          location: null,
        };
      },
    },
  },
  {
    method: "*",
    path: "/{any*}",
    handler: function (request, h) {
      return h.response("Resource Not Found!").code(404);
    },
  },
];

module.exports = {
  routes,
};
