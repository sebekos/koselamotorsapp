const mongoose = require("mongoose");

const ResetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    attempts: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Reset = mongoose.model("Reset", ResetSchema);
