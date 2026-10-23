const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const validateRegistration = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string()
      .trim()
      .lowercase()
      .custom((value, helpers) => {
        if (!validator.isEmail(value)) {
          return helpers.error('any.invalid');
        }

        return value;
      })
      .required(),
    password: Joi.string()
      .min(8)
      .custom((value, helpers) => {
        if (Buffer.byteLength(value, 'utf8') > 72) {
          return helpers.error('any.invalid');
        }

        return value;
      })
      .required(),
  }).required(),
});

module.exports = { validateRegistration };
