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

const wallPaperModel = Joi.object({
  url: Joi.string(),
  description: Joi.string().allow(""),
  photographer: Joi.string().allow(""),
  provider: Joi.string(),
  location: locationModel.allow(null),
}).label("Wallpaper");

const wallPaperQuery = Joi.object({
  forceRefresh: Joi.boolean().default(false),
  provider: Joi.string().default(null)
});

const providerModel = Joi.array().items(Joi.object({
  name: Joi.string(),
  version: Joi.string()
}));

module.exports = {
  positionModel,
  locationModel,
  wallPaperModel,
  wallPaperQuery,
  providerModel
};
