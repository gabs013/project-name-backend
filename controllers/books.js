const Book = require('../models/book');

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

module.exports = {
  getBooks,
  createBook,
};
