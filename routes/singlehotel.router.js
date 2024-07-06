const express = require("express");
const router = express.Router();

const sinhandler=require("../controllers/singlehotel")
router.route("/:id")
  .get(sinhandler);

module.exports = router;
