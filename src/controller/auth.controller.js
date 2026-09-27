import userModel from "../models/user.model.js"
import config from "../config/config.js"
import jwt from "jsonwebtoken" 
import crypto from "crypto"

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

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

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

export async function getMe(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message : "User fetched Successfully",
            user :{
                username : user.username,
                email : user.email
            }
        });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}