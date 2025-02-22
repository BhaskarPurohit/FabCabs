const userModel = require('../models/user.model');
const createUser = require('../services/user.service');
const userService = require("../services/user.service")
const { validationResult } = require("express-validator")
const generateAuthToken = require("../models/user.model")


const registerUser = async function (req, res, next){
    const errors = validationResult(req)
    if(!errors){
        res.status(400).json( { errors: errors.array() })
    }

    const { name, email, password} = req.body
    // console.log(req.body);
    

    const hashedPassword = await userModel.hashedPassword(password)

    const user = await createUser({
        firstname:name.firstname,
        lastname:name.lastname,
        email,
        password: hashedPassword

    })

    const token = user.generateAuthToken()

    res.status(201).json({ token, user })
    
}

const loginUser = async function(req, res){
    const { email, password } = req.body
    const user = await userModel.findOne({ email }).select('+password')

    if(!user){
        res.status(401).json({
            message:"Invalid Email or Password"
        })
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        res.status(401).json({
            message:"Incorrect Password"
        })
    }

    const token = user.generateAuthToken()

    res.status(200).json({ token, user })
}


const getUserProfile = async function (req,res){
    res.status(200).json({user: req.user})
}

const getUserLogout = async function(req,res){
    res.clearCookie('token')
    const token = req.cookies.token ||  req.headers.authorization.split(' ')[1]

    res.status(200).json({
        message:"logged out"
    })
}

module.exports = {registerUser, loginUser, getUserProfile, getUserLogout}