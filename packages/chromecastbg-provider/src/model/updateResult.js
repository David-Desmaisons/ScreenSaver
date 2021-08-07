const Joi = require("joi");

const updateResult = Joi.object({
  ok: Joi.boolean(),
}).label("LocalOptions");

module.exports = {
    updateResult,
};
