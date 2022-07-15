import Post from '../Models/Post.js' 
import User from '../Models/User.js' 

import mongoose from 'mongoose'

// Create new post
export const createPost = async(req, res) => {
    const newPost = new Post(req.body)
    try {
        await newPost.save()
        res.status(200).json({message:"Post created", post:newPost})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get a post
export const getPost = async(req,res)=>{
    const id = req.params.id
    try {
        const post = Post.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// Update a post
export const updatePost = async(req,res)=>{
    const id = req.params.id
    const { userId } = req.body
    try {
        const post = await Post.findById(id)
        if(post.userId === userId){
            await post.updateOne({ $set: req.body })
            res.status(200).send("Post updated successfully")
        }else{
            res.status(403).send("Action forbidden")
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// Delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body
    try {
        const post = await Post.findById(id)
        if(post.userId === userId){
            await post.deleteOne()
            res.status(200).send("Post deleted successfully")
        }else{
            res.status(403).send("Action forbidden")
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Like or dislike a post
export const likePost=async(req,res)=>{
    const id = req.params.id
    const { userId } = req.body
    try {
        const post = await Post.findById(id)
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}})
            res.status(200).send("Post liked")
        }else{
            await post.updateOne({$pull:{likes:userId}})
            res.status(200).send("Post unliked")
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Get timeline posts
export const getTimelinePosts = async(req, res) => {
    const userId = req.params.id
    try {
        // posts of current user
        const currentUserPosts = await Post.find({userId:userId})
        // post of current user following
        const followingUsersPosts = await User.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from :"posts",
                    localField:"following",
                    foreignField:"userId",
                    as:"followingPosts"
                }
            },
            {
                $project:{
                    followingPosts: 1,
                    _id:0
                }
            }
        ])
        res.status(200).json(currentUserPosts.concat(...followingUsersPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt
        })
        )
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
