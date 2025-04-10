const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3, "firstname should be atleast 3 characters long"]
        },
        lastname:{
            type:String,
            minlength:[3, "lastname should be atleast 3 characters long"]
        }
    },
    
    email:{
        type:String,
        required:true,
        minlength:[5, "email should be atleast 5 characters long"],
        unique:true
    },

    password:{
        type:String,
        required:true,
        select: false
    },

    socketId:{
        type:String,
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id:this._id}, process.env.JWT_SECRET, { expiresIn:'24h' });
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashedPassword = async function(password){
    if (!password) throw new Error("Password is required for hashing");
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema)

module.exports = userModel