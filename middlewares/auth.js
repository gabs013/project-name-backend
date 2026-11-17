const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Se requiere autorización'));
  }

  const token = authorization.slice(7);
  let payload;

  try {
    payload = jwt.verify(token, jwtSecret, {
      algorithms: ['HS256'],
    });
  } catch (error) {
    return next(new UnauthorizedError('El token no es válido o ha expirado'));
  }

  if (
    !payload
    || typeof payload._id !== 'string'
    || !/^[a-fA-F0-9]{24}$/.test(payload._id)
  ) {
    return next(new UnauthorizedError('El token no es válido'));
  }

  req.user = { _id: payload._id };

  return next();
};

module.exports = auth;
