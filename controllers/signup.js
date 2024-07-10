const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const um = require("../model/user.model");

const signupHandler = async (req, res) => {
  try {
    // Extract user data from request body
    const { username, number, email, password } = req.body;

    // Validate input data (basic example, consider using a library like Joi for more robust validation)
    if (!username || !number || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const userobj = {
      username,
      number,
      email,
      password: hashedPassword,
    };

    // Save the new user to the database
    const newUser = new um(userobj);
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send success response with token
    res.status(201).json({ message: "User created successfully", token });

  } catch (err) {
    // Send error response
    res.status(500).json({ message: "Error creating a user", error: err.message });
  }
}

module.exports = signupHandler;
