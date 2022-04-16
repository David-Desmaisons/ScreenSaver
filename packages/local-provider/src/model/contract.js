const Joi = require("joi");

const localProviderOption = Joi.object({
  rootDirectory: Joi.string(),
}).label("LocalOptions");

const imageResult = Joi.object({
  success: Joi.boolean(),
}).label("ImageResult");

const imageInformation = Joi.object({
  path: Joi.string().uri(),
}).label("ImageResult");

module.exports = {
  localProviderOption,
  imageResult,
  imageInformation
};
