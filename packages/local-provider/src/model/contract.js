const Joi = require("joi");

const localProviderOption = Joi.object({
  rootDirectory: Joi.string(),
}).label("LocalOptions");

module.exports = {
  localProviderOption,
};
