const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Debugging: Check imported functions
console.log('captainController:', captainController);
console.log('authMiddleware:', authMiddleware);

// Register route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("Firstname must be at least 3 letters"),
    body('password').isLength({ min: 6 }).withMessage("Minimum 6 character password required"),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Color should be of length 3"),
    body('vehicle.registrationPlate').isLength({ min: 5 }).withMessage('Registration number too short'),
    body('vehicle.capacityOfVehicle').isLength({ min: 1 }).withMessage('Capacity must be at least 1 passenger'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain);

// Login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Minimum length of password must be 6')
], captainController.loginCaptain);

// Profile route
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

// Logout route
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;