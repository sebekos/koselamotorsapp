const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const User = require("../../models/User");
const Reset = require("../../models/Reset");

// @route       POST api/user
// @description Register user
// @access      Public
router.post(
    "/",
    [
        check("email", "Password is required").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
        check("registerkey", "Key is required").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.body.registerkey !== process.env.REGISTER_KEY) {
            return res.status(400).json({
                errors: [{ msg: "Please contact admin to get a registration key" }]
            });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists" }] });
            }
            user = new User({
                email,
                password
            });
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            // Hash password
            user.password = await bcrypt.hash(password, salt);
            // Save user
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            res.status(500).send("Server Error");
        }
    }
);

// @route       POST api/user/pwreset
// @description Setup reset
// @access      Public
router.post("/reset", [check("email", "Email is required").not().isEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ errors: [{ msg: "Server Error" }] });
    }

    // Check attempts
    const pwresetcheck = await Pwreset.findOne({ email });
    if (pwresetcheck && pwresetcheck.attempts >= 3) {
        return res.status(400).json({ errors: [{ msg: "Account disabled, please contact the admin to reset your password" }] });
    }

    // Delete previous reset links
    await Reset.deleteMany({ email: email });

    reset = new Reset({
        email: email,
        hash: ""
    });

    // Encrypt key
    const salt = await bcrypt.genSalt(10);
    // Random bytes
    const random = await randomBytes(10).toString("hex");
    // Hash key
    reset.hash = await bcrypt.hash(random, salt);
    // Save
    await reset.save();

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.PW_RESET_EMAIL,
            pass: process.env.PW_RESET_PW
        },
        secure: false,
        tls: { rejectUnauthorized: false }
    });

    var mailOptions = {
        from: process.env.RESET_EMAIL,
        to: email,
        subject: "Pro 1 Realty Reset",
        text: `Follow the link below to reset your password. http://localhost:3000/pwreset/${random}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.json({ msg: "Error sending email" });
        } else {
            return res.json({ msg: "Reset email sent" });
        }
    });
});

module.exports = router;
