const express = require("express");
const router = express.Router();
const multiparty = require("multiparty");
const { uuid } = require("uuidv4");
const fs = require("fs");
const auth = require("../../middleware/auth");
const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const FileType = require("file-type");
const dotenv = require("dotenv");
require("dotenv").config();

const Inventory = require("../../models/Inventory");

// configure the keys for accessing AWS test
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
        ACL: "public-read",
        Body: buffer,
        Bucket: process.env.AWS_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
};

router.post("/", auth, (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        // Check for data
        if (fields === undefined || files === undefined) return res.status(400).json({ errors: [{ msg: "File error" }] });

        // Constants
        const photoCnt = Object.keys(files).length;
        const gallery_id = fields.gallery_id;

        // Error check
        if (error) throw new Error(error);
        if (photoCnt % 2 !== 0 || photoCnt < 2) throw new Error("File error");

        // Check gallery permissions
        const gallery = await Gallery.findOne({ where: { id: gallery_id } });
        const { userId } = req;
        const { createdUser } = gallery;
        if (userId !== createdUser) {
            return res.status(401).json({ msg: "This gallery is private" });
        }

        // Upload files
        let returnUrls = null;
        await Promise.all(
            Object.keys(files).map(async (photo) => {
                let fieldName = files[photo][0].fieldName;
                let path = files[photo][0].path;
                let buffer = fs.readFileSync(path);
                let type = await FileType.fromBuffer(buffer);
                let curUuid = uuid();
                let fileName = `gallery/${gallery_id}/${curUuid}-${fieldName}`;
                return new Promise((resolve, reject) => resolve(uploadFile(buffer, fileName, type)));
            })
        )
            .then((results) => {
                returnUrls = results.map((item) => {
                    return item.Location;
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({ errors: [{ msg: "S3 Error" }] });
            });
        await Photos.findByIdAndUpdate(fields.group[0], { $set: { photos: photoArray } }, { new: true });
        return res.status(200).send(returnUrls);
    });
});

module.exports = router;
