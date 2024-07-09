const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectdb = require('./config/dbconfig');
const hotelrouter = require('./routes/hotel.router');
const catrouter = require('./routes/category.router');
const hoteladded = require('./routes/dataimport.router');
const categoryadded = require('./routes/categoryimport.router');
const atr = require('./routes/auth.router');
const shr = require('./routes/singlehotel.router');

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Adjust with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectdb();

// Routes
app.get("/", (req, res) => {
  res.send("Hello Geeks");
});

app.use("/api/hotels", hotelrouter);
app.use("/api/hoteldata", hoteladded); // POST
app.use("/api/categories", catrouter);
app.use("/api/categorydata", categoryadded); // POST
app.use("/api/auth", atr); // POST
app.use("/api/hotels", shr);

const PORT = process.env.PORT || 3500;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
