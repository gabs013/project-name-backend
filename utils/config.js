require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  DATABASE_URL: environmentDatabaseUrl,
  PORT = 3000,
  CORS_ORIGINS = '',
} = process.env;

const isProduction = NODE_ENV === 'production';

if (isProduction && !JWT_SECRET) {
  throw new Error('Debes configurar JWT_SECRET en producción');
}

if (isProduction && !environmentDatabaseUrl) {
  throw new Error('Debes configurar DATABASE_URL en producción');
}

if (isProduction && !CORS_ORIGINS.trim()) {
  throw new Error('Debes configurar CORS_ORIGINS en producción');
}

const jwtSecret = isProduction
  ? JWT_SECRET
  : 'asterion-clave-solo-para-desarrollo-local';

const DATABASE_URL = environmentDatabaseUrl
  || 'mongodb://127.0.0.1:27017/asteriondb';

const allowedOrigins = isProduction
  ? CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

module.exports = {
  PORT,
  DATABASE_URL,
  jwtSecret,
  allowedOrigins,
};
