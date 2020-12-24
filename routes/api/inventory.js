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
        const inventories = await Inventory.aggregate().sort({ createdAt: -1 });
        res.json(inventories);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route       GET api/inventory/info/:id
// @description Get one inventory
// @access      Public
router.get("/info/:id", async (req, res) => {
    const inventory_id = req.params.id;
    try {
        const inventory = await Inventory.findById(inventory_id);
        res.json(inventory);
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

// @route       POST api/inventory/update
// @description Update inventory
// @access      Private
router.post(
    "/update",
    [
        auth,
        [
            check("_id", "ID is required").isLength({
                min: 1,
                max: 64
            }),
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
            const { _id, name, description, status } = req.body;
            const inventoryFields = {
                name,
                description,
                status
            };
            // Check if exists
            let inventory = await Inventory.findOne({ _id });
            if (!inventory) {
                return res.status(401).json({ msg: "Inventory not found" });
            }
            // Update inventory
            inventory = await Inventory.findOneAndUpdate({ _id }, { $set: inventoryFields }, { new: true });
            res.json(inventory);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }
);

// @route       POST api/inventory/savemedia/:id
// @description Save media
// @access      Private
router.post("/savemedia/:id", [auth], async (req, res) => {
    const inventory_id = req.params.id;
    const photos = req.body.photos;
    try {
        const inventoryFields = {
            photos
        };
        // Check if exists
        let inventory = await Inventory.findById(inventory_id);
        if (!inventory) {
            return res.status(401).json({ msg: "Inventory not found" });
        }
        // Update inventory
        inventory = await Inventory.findByIdAndUpdate(inventory_id, { $set: inventoryFields }, { new: true });
        res.json(inventory);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

// @route       POST api/inventory/delete/:id
// @description Delete inventory
// @access      Private
router.post("/delete/:id", [auth], async (req, res) => {
    const inventory_id = req.params.id;
    try {
        const inventoryFields = {
            deleted: 1
        };
        // Check if exists
        let inventory = await Inventory.findById(inventory_id);
        if (!inventory) {
            return res.status(401).json({ msg: "Inventory not found" });
        }
        // Update inventory
        inventory = await Inventory.findByIdAndUpdate(inventory_id, { $set: inventoryFields }, { new: true });
        res.json(inventory);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

module.exports = router;
