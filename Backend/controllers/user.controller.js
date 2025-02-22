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
    console.log(req.body);
    

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

module.exports = {registerUser}