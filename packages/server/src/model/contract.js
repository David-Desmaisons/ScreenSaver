const Joi = require("joi");

const positionModel = Joi.object({
  latitude: Joi.number(),
  longitude: Joi.number(),
}).label("Position");

const locationModel = Joi.object({
  title: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  position: positionModel.allow( null )
}).label("Location");

const responseModel = Joi.object({
  url: Joi.string(),
  description: Joi.string(),
  photographer: Joi.string(),
  provider: Joi.string(),
  location: locationModel.allow( null ),
}).label("Wallpaper");

const wallPaperQuery = Joi.object({
  forceRefresh: Joi.boolean().default(false)
});

module.exports = {
  positionModel,
  locationModel,
  responseModel,
  wallPaperQuery
}