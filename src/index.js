// require('dotenv').config({path: './env'}); --> not used since it breaks the consistency of using import
import dotenv from "dotenv";
import connectDB from "./db/index.js"; // .js extension is important
import { app } from "./app.js";
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants"
// import connectDB from "./db"; // -> gives error -- directory import not supported resolving ES modules

dotenv.config({
    path: './env'
}) // this statement is added when we use import syntax for dotenv

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`); // using or 8000 with port to prevent app from crashing when deployed on server in production
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!", err);
}) // an asynchroonous function alw ays returns a promise




/*
//approach 1
import express from "express"
const app = express()

;( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error:", error);
            throw error;
        }) //listener in express --> it can listen to various errors like what is our express app can't communicate
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch(error){
        console.error("Error:", error)
        throw error
    }
})() // execute the function immediately  --> writing function as an iffiy instead of simple defination follow by call is a better approach, the inital ; is for cleaning purpose (if semicolon is not there after previous statement, it may cause issues)

// In database connection logic, always use try catch and async await
*/


// dotenv is used so that once the application loads, env variables become available everywhere, we load them in index.js ,ie, starting point of our app
// in package.json scripts -- "dev": nodemon -r dotenv/config --experimental-json-modules --> directly load environmental variables -- but this way is not used rn (therefore --experimental is used)

// if env variables are changes, we need to restart app, nodemon cannot restart the app in this case