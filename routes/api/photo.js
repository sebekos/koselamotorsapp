const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const auth = require('../../middleware/auth');
const Photos = require('../../models/Photos');
const { check, validationResult } = require('express-validator');

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

// @route       POST api/upload
// @description Upload photo
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

            console.log(fields);

            // const photos = await Photos.findOne();
            // if (photos && data) {
            //     const newPhoto = Object.entries(data)[1][1];
            //     const photoArray = [...photos.photos, newPhoto];
            //     await Photos.findByIdAndUpdate(photos._id, { $set: { "photos": photoArray } }, { new: true });
            //     return res.status(200).send(newPhoto);
            // }

            // Build photo object
            const photosFields = {};
            if (data) photosFields.name = 'Test Name';
            if (data) photosFields.description = 'Test Description';
            if (data) photosFields.photos = [Object.entries(data)[1][1]];
            field = new Photos(photosFields);
            await field.save();
            res.json(field);
        } catch (error) {
            return res.status(400).send(error);
        }
    });
});

// @route       POST api/upload/gallery
// @description Add new gallery
// @access      Private
router.post('/gallery', [auth, [
    check('group', 'Length must be greater than 1 and less than 32').isLength({ min: 1, max: 32 })
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const photos = await Photos.findOne({ name: req.body.group });
        if (photos) {
            return res.status(400).json({ errors: [{ msg: 'Gallery already exists' }] });
        }
        const photosFields = {};
        photosFields.name = req.body.group;
        photosFields.description = 'Test Description';
        photosFields.photos = [];
        const field = new Photos(photosFields);
        await field.save();
        res.json(field);
    } catch (error) {
        return res.status(400).send(error);
    }
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
        // const photos = await Photos.find();
        const photos = await Photos.aggregate().sort({ date: -1 });
        res.json(photos);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// GET api/photo/:id
// Photos route, get one gallery
// Public
router.get('/:id', async (req, res) => {
    try {
        const photos = await Photos.findById(req.params.id);
        res.json(photos);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;