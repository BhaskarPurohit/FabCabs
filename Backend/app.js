const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db"); 
const userRoutes = require("./routes/user.routes"); 
const captainRoutes = require("./routes/captain.routes")
const app = express();
const cookieParser = require("cookie-parser")

// Connect to the database
connectToDb()

// Middleware
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// API Routes
app.use("/users", userRoutes);
app.use('/captain',captainRoutes)

module.exports = app; // Export app for server.js
