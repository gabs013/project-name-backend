const { NODE_ENV, JWT_SECRET } = process.env;

if (NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('Debes configurar JWT_SECRET en producción');
}

const jwtSecret = NODE_ENV === 'production'
  ? JWT_SECRET
  : 'asterion-clave-solo-para-desarrollo-local';

module.exports = { jwtSecret };
