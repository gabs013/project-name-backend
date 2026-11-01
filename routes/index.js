const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const {
  validateRegistration,
  validateLogin,
} = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const booksRouter = require('./books');

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/books', booksRouter);

module.exports = router;
