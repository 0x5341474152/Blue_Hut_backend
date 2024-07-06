const express = require('express');

const router = express.Router();

const Category = require('../model/category.model');
const Categories = require('../data/category');

router.route("/")
    .post(async (req, res) => {
        try {
            // Remove all existing documents from the Hotel collection
            await Category.deleteMany({});
            // Insert new documents into the Hotel collection
            const ctt = await Category.insertMany(Categories.data);
            res.json(ctt);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Could not add hotels" });
        }
    });

module.exports = router;
