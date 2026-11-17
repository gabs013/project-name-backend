const { rateLimit } = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-6',
  legacyHeaders: false,
  message: {
    message: 'Has realizado demasiadas solicitudes. Inténtalo más tarde.',
  },
});

module.exports = apiLimiter;
