const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
        });
        console.log(`MONGO db  connected: ${conn.connection.host}`);
        
    }catch (error){
        console.log(`Error : ${error.message}`);
        
    }
}

module.exports= connectDB