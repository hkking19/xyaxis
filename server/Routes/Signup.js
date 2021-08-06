const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

router.post('/',userSignupValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(203).json({ error: { message: errors.array() } });
    }
   
});

module.exports = router;