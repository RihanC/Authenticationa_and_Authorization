import mongoose from "mongoose";
import config from "./config.js";

if(!config.MONGO_URI){
    throw console.error("Cannot connect to database as MONGO_URI is not been provided");
    
}

async function connectDB() {
    await mongoose.connect(config.MONGO_URI)
    console.log("Connected to DataBase")
}


export default connectDB