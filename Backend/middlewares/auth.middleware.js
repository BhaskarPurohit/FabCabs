const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken");

const authUser = async function (req, res, next) {
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization?.split(' ')[1] : null);


    console.log("Received Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access - No token" });
    }

    const isBlackListed = await userModel.findOne({ token:token })

    if(isBlackListed){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    try {
        console.log("JWT Secret:", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        const user = await userModel.findById(decoded.__id);
       

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
