const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');

const app = express();
const { PORT = 3000 } = process.env;

const DATABASE_URL = 'mongodb://127.0.0.1:27017/asteriondb';

app.use(express.json());

// Ruta temporal para comprobar que el servidor responde.
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'API de La biblioteca de Asterión',
  });
});

app.use(routes);

app.use((req, res) => {
  res.status(404).send({
    message: 'La ruta solicitada no existe',
  });
});

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
