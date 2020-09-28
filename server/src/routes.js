const Joi = require("joi");

const positionModel = Joi.object({
  latitude: Joi.number(),
  longitude: Joi.number(),
}).label("Position");

const locationModel = Joi.object({
  title: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  position: positionModel
}).label("Location");

const responseModel = Joi.object({
  url: Joi.string(),
  description: Joi.string(),
  photographer: Joi.string(),
  provider: Joi.string(),
  location: locationModel.allow( null ),
}).label("Wallpaper");

const routes = [
  {
    method: "GET",
    path: "/wallpaper",
    options: {
      tags: ['api'],
      handler: (request, h) => {
        return {
          "url": "https://lh4.googleusercontent.com/-9n3C3hJmGGc/UQmHUE2y6RI/AAAAAAAAgu8/08oNF_dL83w/s2560/IMG_1311.jpg",
          "description": "IMG-1311.jpg",
          "photographer": "Grzegorz Głowaty",
          "provider": "chromeCast",
          "location": null
        };
      },
      response: { schema: responseModel },
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
