const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const connectionString = process.env.DB_URI
function connectToDB(){
    try{mongoose.connect(connectionString)
    console.log("Connected to DB");}
    catch{
        console.log("cant connect to DB");
        
    }
    
}

module.exports = connectToDB