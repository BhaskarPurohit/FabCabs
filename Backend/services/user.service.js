const userModel = require("../models/user.model")

const createUser = async function ({ firstname, lastname,  email, password }){
    //check if the user has passed required fields
    if(!firstname || !password || !email){
        throw new Error("All fields are required")
    }

    //creating user if the required fields are present
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },

        email,
        password
    })
}