const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Text = require("../../models/Text");
const auth = require("../../middleware/auth");

// @route       GET api/text
// @description Get text data for entire site
// @access      Public
router.get("/", async (req, res) => {
    try {
        const text = await Text.find();
        res.json(text);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route       POST api/text
// @description Add/update text field
// @access      Private
router.post(
    "/",
    [
        auth,
        [
            check("name", "Field name is required")
                .not()
                .isEmpty(),
            check("text", "Text is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        // Check if user has access
        if (req.user.access != "2") {
            return res.status(401).json({ msg: "User not authorized" });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, text } = req.body;

        // Build text object
        const textFields = {};
        if (name) textFields.name = name;
        if (text) textFields.text = text;

        try {
            let field = await Text.findOne({ name: req.body.name });
            // Update
            if (field) {
                field = await Text.findOneAndUpdate({ name: req.body.name }, { $set: textFields }, { new: true });
                return res.json(field);
            }

            // Create new
            field = new Text(textFields);
            await field.save();
            res.json(field);
        } catch (err) {
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
