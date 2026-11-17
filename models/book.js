const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
  openLibraryId: {
    type: String,
    required: [true, 'El identificador de Open Library es obligatorio'],
    match: [/^\/works\/OL\d+W$/, 'El identificador de Open Library no es válido'],
  },
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
  },
  authors: {
    type: [String],
    default: [],
  },
  firstPublishYear: {
    type: Number,
    default: null,
    validate: {
      validator: (year) => year === null || Number.isInteger(year),
      message: 'El año debe ser un número entero',
    },
  },
  coverUrl: {
    type: String,
    default: '',
    validate: {
      validator: (url) => url === '' || validator.isURL(url, {
        protocols: ['http', 'https'],
        require_protocol: true,
      }),
      message: 'La dirección de la portada debe ser una URL válida',
    },
  },
  keyword: {
    type: String,
    required: [true, 'La palabra de búsqueda es obligatoria'],
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('book', bookSchema);
