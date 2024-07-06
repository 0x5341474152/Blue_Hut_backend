const express = require('express');
const router = express.Router();
// Ensure the correct case is used for model

const Categories = require('../data/category'); // Ensure this is imported if using in the first route


const categoryhandler=require("../controllers/category");

router.route("/")
    .get(categoryhandler);

module.exports = router;
