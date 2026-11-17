const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Correo o contraseña incorrectos');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Correo o contraseña incorrectos');
          }

          return jwt.sign(
            { _id: user._id.toString() },
            jwtSecret,
            { expiresIn: '7d', algorithm: 'HS256' },
          );
        });
    })
    .then((token) => res.status(200).send({ token }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new UnauthorizedError('El usuario de esta sesión ya no existe');
    }

    return res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  })
  .catch(next);

module.exports = { createUser, login, getCurrentUser };
