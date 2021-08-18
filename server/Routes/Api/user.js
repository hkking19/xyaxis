const express = require('express');

const router = express.Router();

// import controller
const { availableUserName, getProfile } = require('../../controllers/user');

router.get('/profile', getProfile);
router.get('/find/username/available', availableUserName);

module.exports = router;
