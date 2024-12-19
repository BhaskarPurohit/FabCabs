const mongoose =require("mongoose")
const bcrypt = require('bcrypt')
const jwtSecret = process.env.JWT_SECRET
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required: true,
            minlength:[3,'First name can not be smaller than 3 letters']
        },
        lastname:{
            type:String,
            required:false
        }
    },
    email:{
        type:String,
        required:true
    },

    //socket ID will be later used to track the captain
    socketId:{
        type:String,
        required:true
    }
})

//making functions on userSchema

//generate Auth Token function
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, jwtSecret)
    return token
}

//compare password function
userSchema.methods.commparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//hash the password
userSchema.methods.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model("User", userSchema)
