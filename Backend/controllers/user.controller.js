const userModel = require("../models/user.model")
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')

//register new user here
const registerUser = async function (req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const  { firstname, lastname, email, password } = req.body
    const hashedPassword = await userModel.hashedPassword(password)

    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword
    })
}

module.exports = registerUser 
