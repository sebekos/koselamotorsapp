const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const auth = require('../../middleware/auth');
const Photos = require('../../models/Photos');
const dotenv = require('dotenv');
require('dotenv').config();

// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.AWS_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
};

// @route       POST api/upload/avatar
// @description Upload user avatar
// @access      Private
router.post('/', [auth], (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = fileType(buffer);
            const timestamp = Date.now().toString();
            const fileName = `gallery/${timestamp}`;
            const data = await uploadFile(buffer, fileName, type);

            const photos = await Photos.findOne();
            if (photos && data) {
                const newPhoto = Object.entries(data)[1][1];
                const photoArray = [...photos.photos, newPhoto];
                await Photos.findByIdAndUpdate(photos._id, { $set: { "photos": photoArray } }, { new: true });
                console.log(newPhoto);
                return res.status(200).send(newPhoto);
            }

            // Build text object
            const photosFields = {};
            if (data) photosFields.photos = [Object.entries(data)[1][1]];
            field = new Photos(photosFields);
            await field.save();
            res.json(field);
        } catch (error) {
            return res.status(400).send(error);
        }
    });
});

// @route       Post api/upload/
// @description Delete photos
// @access      Private
router.post('/delete', [auth], async (req, res) => {
    try {
        const photos = await Photos.findOne();
        if (photos) {
            await Photos.findByIdAndUpdate(photos._id, { $set: { "photos": req.body } }, { new: true });
            return res.status(200).send(req.body);
        }
        return res.status(400).send('Server Error');
    } catch (error) {
        return res.status(400).send(error);
    }
});

// GET api/photo
// Photos route
// Public
router.get('/', async (req, res) => {
    try {
        const photos = await Photos.find();
        res.json(photos[0].photos);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;