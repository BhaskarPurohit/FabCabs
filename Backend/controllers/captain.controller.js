const captainModel = require("../models/captian.model")
const captainService = require("../services/captain.service")
const { validationResult } = require("express-validator")

const registerCaptain = async function (req,res,next){
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({ errors:errors.array() })
    }

    const { fullname, email, password, vehicle } = req.body

    const isCaptainExist = await captainModel.findOne({ email })

    if(isCaptainExist){
        return res.status(400).json({ message: 'Captain already exist' })
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color:vehicle.color,
        registrationPlate: vehicle.registrationPlate,
        capacityOfVehicle: vehicle.capacityOfVehicle,
        vehicleType:vehicle.vehicleType
    })

    const token = captain.generateAuthToken()

    res.status(201).json({ token, captain })
}

module.exports = { registerCaptain }