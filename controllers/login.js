const bcrypt=require("bcrypt");
const um=require("../model/user.model");

const loginHandler=async(req,res)=>{
    try{
        const { number, password } = req.body;

        // Validate input data
        if (!number || !password) {
            return res.status(400).json({ message: "Number and password are required" });
        }

        // Find the user by their number
        const usser = await um.findOne({ number: number });
        if (!usser) {
            res.status(401).json({ message: "Invalid number " });
        }
        const match=await bcrypt.compare(password,usser.password);
        if(!match){
            return res.status(401).json({message:"invalid password"})
        }
        res.status(200).json({ message: "Login successful" });
    }
    catch(err){
        res.status(500).json({message:"error logging in" ,err:err.message})
    }
 }
  

  module.exports=loginHandler;