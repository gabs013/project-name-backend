const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const {
  validateRegistration,
  validateLogin,
} = require('../middlewares/validation');

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateLogin, login);

module.exports = router;
