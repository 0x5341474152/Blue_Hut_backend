const express = require('express');
const router = express.Router();

const hotelCategory = require('../controllers/hotel');

// Route to get all hotels or filter by category
router.route('/')
    .get(hotelCategory);

module.exports = router;