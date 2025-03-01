const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required: true,
            minLength:[3, "Minimum length must be of 3 letters"]
        },

        lastname:{
            type:String,
            required:false,

        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/, 'Enter a valid Email']
    },

    password:{
        type:String
    },

    socketId:{
        type:String
    },

    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },

    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,"minimum length of 3"]
        },

        registrationPlate:{
            type:String,
            required:true,
            unique:true,
            minLength:[5,"Entered number is less than required length"]
        },

        capacityOfVehicle:{
            type:Number,
            required:true,
            min:[1, "At least 1 passanger capacity is required"]
        },

        vehicleType:{
            type:String,
            required:true,
            enum:['car','bike','auto']
         }
    },

    lattitude:{
        type:Number,
    },

    longitude:{
        type:Number
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id:this._id }, process.env.JWT_SECRET, { expiresIn: '24h'})
    return token
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('Captain',captainSchema)

module.exports = captainModel