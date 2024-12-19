const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required: true,
            minlength:[3, 'First name must be at least 3 characters long!']
        },
        lastname:{
            type:String,
            required:false,
        }
    },
    email:{
        type:String,
        required: true,
    },
    socketId:{
        type:String
    }
})