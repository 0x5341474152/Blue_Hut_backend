const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const um = require("../model/user.model");

const JWT_SECRET = 'your_jwt_secret_key'; // Ideally, store this in an environment variable for security

const loginHandler = async (req, res) => {
  try {
    const { number, password } = req.body;

    // Validate input data
    if (!number || !password) {
      return res.status(400).json({ message: "Number and password are required" });
    }

    // Find the user by their number
    const user = await um.findOne({ number: number });
    if (!user) {
      return res.status(401).json({ message: "Invalid number" });
    }

    // Check if the password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate an access token
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the access token and user information
    res.status(200).json({
      message: "Login successful",
      accessToken,
      username: user.username
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", err: err.message });
  }
};

module.exports = loginHandler;
