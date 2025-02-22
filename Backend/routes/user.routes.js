const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const userController = require("../controllers/user.controller")
const authUser = require("../middlewares/auth.middleware")

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min:3 }).withMessage("First Name must be atleast 3 characters long"),
    body("password").isLength({ min:6 }).withMessage("Password must be 6 characters long"),
 ],

 (req,res)=> userController.registerUser(req,res)


)

router.post('/login',[
    body('email').isEmail().withMessage("invalid Email"),
    body('password').isLength({ min:3 }).withMessage('password length too short')
],
    (req, res)=> userController.loginUser(req,res)

)

router.get('/profile',authUser, userController.getUserProfile)
router.get('logout', authUser, userController.getUserLogout)


module.exports = router