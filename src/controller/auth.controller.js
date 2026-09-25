import userModel from "../models/user.model.js"
import config from "../config/config.js"
import jwt from "jsonwebtoken" 
import crypto from "express"

export async function register(req, res) {
    const { username, email, password}= req.body

    const isAlreadyRegistered = await userModel.findOne({
        $or :[
            {
                username
            },{
                email
            }
        ]
    })


    if(isAlreadyRegistered){
        return res.status(409).json({
            message : "User with this username and email already exist"
        })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password : hashedPassword
    })


    const token = jwt.sign({
        id : user._id
    }, config.JWT_SECRET,{
        expiresIn : "1d"
    }
)


res.status(201).json({
    message : " User has been created",

    user : {
        username : user.username,
        email : user.email,
        token
    }
})



    
}