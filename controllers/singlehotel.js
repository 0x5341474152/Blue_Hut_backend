
const mongoose = require("mongoose");

const Hotel = require("../model/hotel.model");

const sinHandler=async (req, res) => {
    try {
      // Extract ID from request parameters
      const { id } = req.params;

      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      // Find hotel by ID
      const hotel = await Hotel.findById(id);

      // Check if hotel exists
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      // Send hotel data as response
      res.json(hotel);
    } catch (err) {
      // Log the error for debugging purposes
      console.error("Error fetching hotel by ID:", err);

      // Send error response
      res.status(500).json({ message: "An error occurred while retrieving the hotel" });
    }
  };

module.exports = sinHandler;
