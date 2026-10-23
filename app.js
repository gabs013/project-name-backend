const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

// Ruta temporal para comprobar que el servidor responde.
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'API de La biblioteca de Asterión',
  });
});

app.listen(PORT, () => {
  process.stdout.write(`Servidor iniciado en el puerto ${PORT}\n`);
});
