const router = require('express').Router();
const { getBooks, createBook } = require('../controllers/books');
const { validateBook } = require('../middlewares/validation');

router.get('/', getBooks);
router.post('/', validateBook, createBook);

module.exports = router;
