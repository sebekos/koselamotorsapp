const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const auth = require("../../middleware/auth");
const Photos = require("../../models/Photos");
const { check, validationResult } = require("express-validator");

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
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.AWS_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// @route       POST api/photo
// @description Upload mutli photos
// @access      Private
router.post("/", [auth], (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      let returnUrls = [];
      const photos = await Photos.findById(fields.group[0]);
      if (!photos) {
        return res.status(400).json({ errors: [{ msg: "Gallery ID Error" }] });
      }

      await Promise.all(
        Object.keys(files).map(photo => {
          let path = files[photo][0].path;
          let buffer = fs.readFileSync(path);
          let type = fileType(buffer);
          let timestamp = Date.now().toString();
          let fileName = `gallery/${timestamp}`;
          return new Promise((resolve, reject) =>
            resolve(uploadFile(buffer, fileName, type))
          );
        })
      )
        .then(results => {
          returnUrls = results.map(item => {
            return item.Location;
          });
        })
        .catch(err => {
          return res.status(400).json({ errors: [{ msg: "S3 Error" }] });
        });

      const photoArray = photos.photos.concat(returnUrls);
      const retObj = {
        group: fields.group[0],
        photos: photoArray
      };
      await Photos.findByIdAndUpdate(
        fields.group[0],
        { $set: { photos: photoArray } },
        { new: true }
      );
      return res.status(200).send(retObj);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
});

// @route       GET api/photo
// @description Gets all galleries
// @access      Public
router.get("/", async (req, res) => {
  try {
    const photos = await Photos.aggregate().sort({ date: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route       POST api/photo/gallery
// @description Add new gallery
// @access      Private
router.post(
  "/gallery",
  [
    auth,
    [
      check("name", "Name must be greater than 1 and less than 64").isLength({
        min: 1,
        max: 64
      }),
      check(
        "description",
        "Description must be greater than 1 and less than 500 characters"
      ).isLength({ min: 1, max: 500 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const photos = await Photos.findOne({ name: req.body.name });
      if (photos) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Gallery already exists" }] });
      }
      const photosFields = {};
      photosFields.name = req.body.name;
      photosFields.description = req.body.description;
      photosFields.photos = [];
      const field = new Photos(photosFields);
      await field.save();
      res.json(field);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

// @route       DELETE api/photo/gallery/:id
// @description Delete gallery
// @access      Private
router.delete("/gallery/:id", auth, async (req, res) => {
  try {
    const photo = await Photos.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ msg: "Gallery not found" });
    }
    await Photos.findByIdAndDelete(req.params.id);
    res.json(req.params.id);
  } catch (err) {
    return res.status(400).send(err);
  }
});

// @route       Post api/photo/delete
// @description Updates photo array
// @access      Private
router.post("/delete", [auth], async (req, res) => {
  try {
    let photos = await Photos.findById(req.body.id);
    if (photos) {
      photos = await Photos.findByIdAndUpdate(
        req.body.id,
        { $set: { photos: req.body.photos } },
        { new: true }
      );
      return res.status(200).send(photos);
    }
    return res.status(400).send("Server Error");
  } catch (error) {
    return res.status(400).send(error);
  }
});

// @route       POST api/photo/text
// @description Update text field
// @access      Private
router.post(
  "/text",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("name", "Name must be between 1 and 100 characters").isLength({
        min: 1,
        max: 100
      }),
      check("description", "Description is required")
        .not()
        .isEmpty(),
      check(
        "description",
        "Description must be between 10 and 500 characters"
      ).isLength({ min: 10, max: 500 })
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

    const { name, description } = req.body;

    // Build text object
    const textFields = {};
    if (name) textFields.name = name;
    if (description) textFields.description = description;

    try {
      let field = await Photos.findById(req.body.id);
      // Update
      if (field) {
        field = await Photos.findByIdAndUpdate(
          req.body.id,
          {
            $set: {
              name: req.body.name,
              description: req.body.description
            }
          },
          { new: true }
        );
        return res.json(field);
      }
      return res.status(401).json({ msg: "Gallery not found" });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
