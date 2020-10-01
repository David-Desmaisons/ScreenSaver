const Joi = require("joi");

const positionModel = Joi.object({
  latitude: Joi.number(),
  longitude: Joi.number(),
}).label("Position");

const locationModel = Joi.object({
  title: Joi.string().allow(""),
  city: Joi.string().allow(""),
  country: Joi.string().allow(""),
  position: positionModel.allow(null),
}).label("Location");

const responseModel = Joi.object({
  url: Joi.string(),
  description: Joi.string().allow(""),
  photographer: Joi.string().allow(""),
  provider: Joi.string(),
  location: locationModel.allow(null),
}).label("Wallpaper");

const wallPaperQuery = Joi.object({
  forceRefresh: Joi.boolean().default(false),
});

module.exports = {
  positionModel,
  locationModel,
  responseModel,
  wallPaperQuery,
};
