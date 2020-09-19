const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Inventory = require("../../models/Inventory");

// @route       GET api/inventory
// @description Gets all inventories
// @access      Public
router.get("/", async (req, res) => {
    try {
        const photos = await Inventory.aggregate().sort({ createdAt: -1 });
        res.json(photos);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route       POST api/inventory
// @description Add new inventory
// @access      Private
router.post(
    "/",
    [
        auth,
        [
            check("name", "Name must be greater than 1 and less than 64").isLength({
                min: 1,
                max: 64
            }),
            check("description", "Description must be greater than 1 and less than 500 characters").isLength({
                min: 1,
                max: 500
            }),
            check("status", "Status is required").isLength({
                min: 1,
                max: 20
            })
        ]
    ],
    async (req, res) => {
        // Check inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, description, status } = req.body;
            const inventoryFields = {
                name,
                description,
                status
            };
            const inventory = new Inventory(inventoryFields);
            await inventory.save();
            res.json(inventory);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }
);

module.exports = router;
