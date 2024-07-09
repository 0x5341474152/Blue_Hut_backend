const express=require('express');
const mongoose=require('mongoose');
const hotelrouter=require("./routes/hotel.router")
const catrouter=require("./routes/category.router")
const connectdb=require("./config/dbconfig")
const hoteladded=require('./routes/dataimport.router')
const categoryadded=require('./routes/categoryimport.router')
const atr=require("./routes/auth.router")
const shr=require("./routes/singlehotel.router")
const cors = require('cors');
app.use(cors());
const app=express();
app.use(express.json());
connectdb();
const PORT=3500;

app.get("/",(req,res)=>{
    res.send("hello geeks")
})
app.use("/api/hotels",hotelrouter);
app.use("/api/hoteldata",hoteladded);//post
app.use("/api/categories",catrouter);
app.use("/api/categorydata",categoryadded);//post
app.use("/api/auth",atr);//post
app.use("/api/hotels",shr)
mongoose.connection.once("open",()=>{

    console.log("connected to db")
    app.listen(process.env.PORT || PORT,()=>{
        console.log("server is listening")
    })
})

