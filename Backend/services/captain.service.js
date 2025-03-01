const captainModel = require('../models/captian.model')

const createCaptain = async function( firstname, lastname, email, password, color, registrationPlate, capacityOfVehicle, vehicleType){
    if(!firstname || !lastname || !email || !password || !color || !registrationPlate || !capacityOfVehicle || !vehicleType){
        throw new Error("All fields are required!")
    }

    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            registrationPlate,
            vehicleType,
            capacityOfVehicle
        }

        
    })

    return captain
}

module.exports = createCaptain