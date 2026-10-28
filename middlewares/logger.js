const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  requestWhitelist: ['method', 'path'],
  responseWhitelist: ['statusCode'],
  msg: 'Solicitud HTTP',
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  requestWhitelist: ['method', 'path'],
  msg: 'Error al procesar la solicitud',
  exceptionToMeta: (error) => ({
    name: error.name,
    statusCode: error.statusCode,
    code: error.code,
  }),
});

module.exports = {
  requestLogger,
  errorLogger,
};
