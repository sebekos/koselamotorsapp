const mongoose = require('mongoose');

const PhotosSchema = new mongoose.Schema({
    photos: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Photos = mongoose.model('photos', PhotosSchema);