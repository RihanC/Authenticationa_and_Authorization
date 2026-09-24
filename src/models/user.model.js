import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : [true, "Username is required for Registration"],
        unique : [true, "Username has to be unique"]
    },
    email : {
        type : String,
        required : [true, "Email is required for Registration"],
        unique : [true, "Email is required for Registration"]
    },
    password :{
        type : String,
        required : [true, "Password is required for Registration"]
    }
})

const userModel = mongoose.model("users", userSchema)

export default userModel