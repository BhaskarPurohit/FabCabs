const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const captainController = require('../controllers/captain.controller')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min:3 }).withMessage("Firstname must be atleast 3 letters"),
    body('password').isLength({ min:6 }).withMessage("Minimum 6 character password required"),
    body('vehicle.color').isLength({ min:3 }).withMessage("Color should be of length 3"),
    body('vehicle.registrationPlate').isLength({ min:5 }).withMessage('Resigtration number too short'),
    body('vehicle.capacityOfVehicle').isLength({ min:1 }).withMessage('Capacity must be at least 1 passanger'),
    body('vehicle.vehicleType').isIn('car','bike','auto').withMessage('Invalid vehicle type')

],

    captainController.registerCaptain
    
)

module.exports = router