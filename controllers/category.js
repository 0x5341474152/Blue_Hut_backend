const Category = require("../model/category.model");

const categoryHandler = async (req, res) => {
    
    try {
        const cll= await Category.find({});
        res.json(cll);
    } catch (err) {
        res.status(404).json({message:"could not find categories"})
    }
}

module.exports = categoryHandler;