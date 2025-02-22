const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db"); // Ensure correct path
const userRoutes = require("./routes/user.routes"); // Adjust path if necessary

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

module.exports = app; // Export app for server.js
