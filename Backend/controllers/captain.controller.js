const captainModel = require("../models/captian.model")
const captainService = require("../services/captain.service")
const { validationResult, ExpressValidator } = require("express-validator")

const registerCaptain = async function (req,res,next){
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

const loginCaptain = async function (req, res, next){
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

module.exports = { registerCaptain, loginCaptain }