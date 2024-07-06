const Hotel = require('../model/hotel.model'); // Ensure the correct path and case for your model

const hotelCategory = async (req, res) => {
    const hotelcategory = req.query.category;

    try {
        let hotels;
        if (hotelcategory) {
            hotels = await Hotel.find({ category: hotelcategory });
        } else {
            hotels = await Hotel.find({});
        }

        hotels.length > 0 ? res.json(hotels) : res.status(404).json({ message: "No data found" });
    } catch (err) {
        console.error('Error fetching hotels:', err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = hotelCategory;