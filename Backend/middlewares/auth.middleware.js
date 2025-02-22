const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken");

const authUser = async function (req, res, next) {
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

    console.log("Received Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access - No token" });
    }

    try {
        console.log("JWT Secret:", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // ✅ Fix: Correct `_id` reference
        console.log("Searching for user with _id:", decoded._id);
        const user = await userModel.findById(decoded.__id);
        console.log("User Found in DB:", user);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Unauthorized access - Token Invalid" });
    }
};

module.exports = authUser;
