const express = require('express');
const router = express.Router();

// import controller
const { signup, signin,verifyToken} = require('../controllers/auth');

// import validators
const {
    userSignupValidator,
    userSigninValidator
} = require('../validators/auth');
const { runValidation } = require('../validators');
const auth = require('../middleware/auth');

router.post('/signup', userSignupValidator, runValidation, signup);

router.post('/signin', userSigninValidator, runValidation, signin);

router.get('/',auth,verifyToken);

module.exports = router;
