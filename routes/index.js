const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateRegistration } = require('../middlewares/validation');

router.post('/signup', validateRegistration, createUser);

module.exports = router;
