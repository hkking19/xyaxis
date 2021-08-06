const express = require('express');
const router = express.Router();

// import controller
const {availableUserName} = require('../../controllers/user');


router.get('/find/username/available',availableUserName)

module.exports = router;
