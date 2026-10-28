const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const { PORT, DATABASE_URL } = require('./utils/config');

const app = express();

app.use(requestLogger);

app.use(express.json());

app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError('La ruta solicitada no existe'));
});

app.use(errorLogger);

app.use(errorHandler);

mongoose.connect(DATABASE_URL)
  .then(() => {
    process.stdout.write('Conexión con MongoDB establecida\n');

    app.listen(PORT, () => {
      process.stdout.write(`Servidor iniciado en el puerto ${PORT}\n`);
    });
  })
  .catch((error) => {
    process.stderr.write(`Error al conectar con MongoDB: ${error.message}\n`);
    process.exitCode = 1;
  });
