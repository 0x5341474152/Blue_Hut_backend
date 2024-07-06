const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Middleware to parse JSON request bodies
router.use(express.json());
const registerhandler=require("../controllers/signup")
router.route("/register")
  .post(registerhandler);


const loginhandler=require("../controllers/login")
router.route("/login")
     .post(loginhandler)
module.exports = router;
