import userModel from "../models/user.model.js"

async function register(req, res) {
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
        res.status(409).json({
            message : "User with this username and email already exist"
        })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password : hashedPassword
    })
    
}