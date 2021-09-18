const express = require('express');
const { broadcast, reciever } = require('../controllers/stream');
const router = express.Router();

router.post('/broadcast', broadcast);
router.post('/reciever', reciever);

module.exports = router;