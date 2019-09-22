const express = require('express');
const router = express.Router();

// GET api/users
// Test Route
// Public
router.get('/', (req, res) => res.send('User Route'));

module.exports = router;