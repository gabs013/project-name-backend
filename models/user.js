const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [30, 'El nombre debe tener como máximo 30 caracteres'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Introduce un correo electrónico válido',
    },
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
