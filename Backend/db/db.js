const mongoose = require("mongoose")
require('dotenv').config()

const dbUrl = process.env.DB_URI

const connectToDb = async () =>{
    try{
        await mongoose.connect(dbUrl)
        console.log('connected to DB');
    }catch(err){
        console.error(err);
        process.exit(1)
        
    }
}

module.exports = connectToDb