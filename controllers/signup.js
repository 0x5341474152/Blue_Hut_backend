const bcrypt=require("bcrypt");
const um=require("../model/user.model");

const signupHandler=async (req, res) => {
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
      const newuser = new um(userobj);
      const sav = await newuser.save();

      // Send success response
      res.status(201).json(sav);
    } catch (err) {
      // Send error response
      res.status(500).json({ message: "Error creating a user", error: err.message });
    }
  }

  module.exports=signupHandler;