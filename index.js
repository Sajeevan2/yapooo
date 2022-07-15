import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'

const app = express()
dotenv.config()

// Middleware
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))

const connect = async()=>{
    try {
        await mongoose.connect(process.env.DB)
        console.log("DB connection established")
    } catch (error) {
        throw error
    }
}

app.use('/auth',AuthRoute)
app.use('/users',UserRoute)
app.use('/posts',PostRoute)


app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port: ${process.env.PORT}`)
    connect()
})