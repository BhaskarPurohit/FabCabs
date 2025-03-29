const captainModel = require("../models/captian.model")
const captainService = require("../services/captain.service")
const { validationResult, ExpressValidator } = require("express-validator")
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.registerCaptain = async function (req,res,next){
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({ errors:errors.array() })
    }

    const { fullname, email, password, vehicle } = req.body

    //destructuing the nested fields
    const { firstname, lastname } = fullname;
    const { color, registrationPlate, capacityOfVehicle, vehicleType } = vehicle;

    const isCaptainExist = await captainModel.findOne({ email })

    if(isCaptainExist){
        return res.status(400).json({ message: 'Captain already exist' })
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        color,
        registrationPlate,
        capacityOfVehicle,
        vehicleType
    })

    const token = captain.generateAuthToken()

    res.status(201).json({ token, captain })
}

module.exports.loginCaptain = async function (req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const captain = await captainModel.findOne({ email }).select('+password')

    if(!captain){
        res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await captain.comparePassword(password)

    if(!isMatch){
        res.status(401).json({ message: 'Invalid username or password' })
    }

    const token = captain.generateAuthToken()

    res.cookie('token', token)

    res.status(200).json({ token, captain })
}

module.exports.getCaptainProfile = async function (req, res){
    res.status(200).json({ captain: req.captain})
    
}

module.exports.logoutCaptain = async function (req, res){

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    await blacklistTokenModel.create({ token })

    res.clearCookie('token')

    res.status(200).json({ message:'Logout Successful'})
}

