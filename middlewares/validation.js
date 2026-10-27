const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

// Para validar el registro del usuario
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

// Para validar el inicio de sesión del usuario
const validateLogin = celebrate({
  [Segments.BODY]: Joi.object({
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

// Para validar los libros
const validateBook = celebrate({
  [Segments.BODY]: Joi.object({
    openLibraryId: Joi.string()
      .pattern(/^\/works\/OL\d+W$/)
      .required(),
    title: Joi.string().trim().min(1).required(),
    authors: Joi.array().items(Joi.string().trim().min(1)),
    firstPublishYear: Joi.number().integer().allow(null),
    coverUrl: Joi.string()
      .allow('')
      .custom((value, helpers) => {
        if (!validator.isURL(value, {
          protocols: ['http', 'https'],
          require_protocol: true,
        })) {
          return helpers.error('any.invalid');
        }

        return value;
      }),
    keyword: Joi.string().trim().min(1).required(),
  }).required(),
});

const validateBookId = celebrate({
  [Segments.PARAMS]: Joi.object({
    bookId: Joi.string()
      .pattern(/^[a-fA-F0-9]{24}$/)
      .required(),
  }).required(),
});

module.exports = { validateRegistration, validateLogin, validateBook, validateBookId };
