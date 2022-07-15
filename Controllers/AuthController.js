import User from "../Models/User.js";
import bcrypt from "bcryptjs"

export const registerUser = async(req,res)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync("123",salt)
        const newUser = new User({
            ...req.body,
            password:hash
        }) 
        await newUser.save()
        res.status(200).send("Registration successful")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user){
            res.status(404).send("User not found")
        }else{
            const validity = await bcrypt.compare(req.body.password,user.password)
            if(!validity) return res.status(400).send("Invalid password")
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}