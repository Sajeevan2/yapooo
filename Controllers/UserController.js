import User from "../Models/User.js";
import bcrypt from "bcryptjs"

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get a user
export const getUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if(!user){
            res.status(404).send("User not found")
        }else{
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails)
        } 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Update a user
export const updateUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const { currentUserId ,currentUserAdminStatus } = req.body
        if(id === currentUserId || currentUserAdminStatus){
            try {
                if(req.body.password){
                    const salt = bcrypt.genSaltSync(10)
                    req.body.password = bcrypt.hashSync(req.body.password,salt)
                }

                const user = await User.findByIdAndUpdate(
                    id,
                    req.body,
                    {new:true}
                )

                const {password, ...otherDetails} = user._doc
                res.status(200).json(otherDetails)
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }else{
            res.status(403).send("Access denied")
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Delete user
export const deleteUser= async (req, res) => {
    const id = req.params.id

    const {currenUserId, currentUserAdminStatus } = req.body
    try {
        if(id === currenUserId || currentUserAdminStatus){
            await User.findByIdAndDelete(id)
            res.status(200).send("User deleted successfully")
        }else{
            res.status(403).send("Access denied")
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Follow a user - current user is gonna follow a user
export const followUser = async(req,res)=>{
    const id = req.params.id

    const { currentUserId } = req.body
    if(currentUserId === id){
        res.status(403).json("Action forbidden")
    }else{
        try {
            const followUser = await User.findById(id)
            const followingUser = await User.findById(currentUserId)

            if(followUser.followers.includes(currentUserId)){
                res.status(403).send("Selected user is already followed by you")
            }else{
                await followUser.updateOne({$push:{followers:currentUserId}})
                await followingUser.updateOne({$push:{following:id}})
                res.status(200).send("User followed")
            }

        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

// Unfollow a user - current user is gonna unfollow a user
export const unFollowUser = async(req,res)=>{
    const id = req.params.id

    const { currentUserId } = req.body
    if(currentUserId === id){
        res.status(403).json("Action forbidden")
    }else{
        try {
            const followUser = await User.findById(id)
            const followingUser = await User.findById(currentUserId)

            if(!followUser.followers.includes(currentUserId)){
                res.status(403).send("Selected user is is not followed by you")
            }else{
                await followUser.updateOne({$pull:{followers:currentUserId}})
                await followingUser.updateOne({$pull:{following:id}})
                res.status(200).send("User unfollowed")
            }
            
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}