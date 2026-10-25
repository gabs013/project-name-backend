const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (isCelebrateError(err)) {
    return res.status(400).send({
      message:'Revisa los datos enviados',
    });
  }

  if (err.code === 11000) {
    return res.status(409).send({
      message: 'Ya existe un usuario con ese correo electrónico',
    });
  }

  if (
    err.name === 'ValidationError'
    || err.name === 'CastError'
    || err.type === 'entity.parse.failed'
  ) {
    return res.status(400).send({
      message: 'Los datos enviados no son válidos',
    });
  }

  if (err.statusCode === 401) {
  return res.status(401).send({
    message: err.message,
  });
}

  return res.status(500).send({
    message: 'Ha ocurrido un error interno del servidor',
  });
};

module.exports = errorHandler;
