const Book = require('../models/book');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getBooks = (req, res, next) => Book.find({
  owner: req.user._id,
})
  .sort({ createdAt: -1 })
  .then((books) => res.status(200).send(books))
  .catch(next);

const createBook = (req, res, next) => {
  const {
    openLibraryId,
    title,
    authors,
    firstPublishYear,
    coverUrl,
    keyword,
  } = req.body;

  return Book.create({
    openLibraryId,
    title,
    authors,
    firstPublishYear,
    coverUrl,
    keyword,
    owner: req.user._id,
  })
    .then((book) => res.status(201).send({
      _id: book._id,
      openLibraryId: book.openLibraryId,
      title: book.title,
      authors: book.authors,
      firstPublishYear: book.firstPublishYear,
      coverUrl: book.coverUrl,
      keyword: book.keyword,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    }))
    .catch(next);
};

const deleteBook = (req, res, next) => Book.findById(req.params.bookId)
  .select('+owner')
    .then((book) => {
      if (!book) {
        throw new NotFoundError('No se encontró el libro');
      }

      if (book.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          'No puedes eliminar un libro guardado por otro usuario',
        );
      }

      return Book.deleteOne({
        _id: book._id,
        owner: req.user._id,
      });
    })

    .then((result) => {
      if (result.deletedCount === 0) {
        throw new NotFoundError('No se encontró el libro');
      }

      return res.status(200).send({
        message: 'Libro eliminado correctamente',
      });
    })

    .catch(next);

module.exports = {
  getBooks,
  createBook,
  deleteBook,
};
