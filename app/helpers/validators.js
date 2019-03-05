const Joi = require('joi');

module.exports = {
  createLocation: Joi.object({
    name: Joi.string().required(),
    male: Joi.number().required(),
    female: Joi.number().required(),
    total: Joi.number().required(),
    nestedLocations: Joi.array(),
  }),

  updateLocation: Joi.object({
    name: Joi.string(),
    male: Joi.number(),
    female: Joi.number(),
    total: Joi.number(),
    nestedLocations: Joi.array(),
  }),

};
