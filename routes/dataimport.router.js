const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Hotel = require('../model/hotel.model');
const hotels = require('../data/hotels');

router.route("/")
    .post(async (req, res) => {
        try {
            // Remove all existing documents from the Hotel collection
            await Hotel.deleteMany({});
            // Insert new documents into the Hotel collection
            const hoteldb = await Hotel.insertMany(hotels.data);
            res.json(hoteldb);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Could not add hotels" });
        }
    });

module.exports = router;
