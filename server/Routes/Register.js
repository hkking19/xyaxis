const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const { check, validationResult } = require("express-validator");

router.post('/', [
    check("name", "please add name").not().isEmpty(),
    check("username", "please add username").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
        "password",
        "Please enter a password with at least min 6 characters length"
    ).isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(203).json({ error: { message: errors.array() } });
    }
    const { username, password, name, email } = req.body;
    try {
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ error: { message: "User Already exists" } });
        }

        user = new User({
            username,
            name,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWTSECRET,
            {
                expiresIn: 3600000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: { message: error.message } })
    }
});

module.exports = router;