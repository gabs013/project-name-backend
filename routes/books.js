const router = require('express').Router();
const {
  getBooks,
  createBook,
  deleteBook,
} = require('../controllers/books');
const {
  validateBook,
  validateBookId,
} = require('../middlewares/validation');

router.get('/', getBooks);
router.post('/', validateBook, createBook);
router.delete('/:bookId', validateBookId, deleteBook);

module.exports = router;
