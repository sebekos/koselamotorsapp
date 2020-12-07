const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    soldAt: {
        type: Date
    },
    deleted: {
        type: Number,
        default: 0
    }
});

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
