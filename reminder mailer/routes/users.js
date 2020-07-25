const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/', (req, res) => {
    const { name, email, message, year, month, day, hour, minute, ampm} = req.body;
});

module.exports = router;