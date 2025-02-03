import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // makes a field searchable in optimised way
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ], // for this we will use a package -> mongoose-aggregate-paginate-v2 --> allows us to write aggregation queries -- npm i mongoose-aggregate-paginate-v2
        password: {
            type: String,
            required: [true, 'Password is required'], // custom error msg
        }, // we store passwords in db by encrypting them --> but then how will we match the passwords if we are using an encrypted string ? -> challenge
        refreshToken: {
            type: String,
        }
    }
, {
    timestamps: true
});

// encrypt password
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
        // this.isModified("string") --> encrypt password only if it has been changed
    this.password = bcrypt.hash(this.password, 10) // hash(kise hash karu?, kitne rounds/ salts?)
    next() // call next as this is middleware so pass on the next flag
}) // do smth before data is saved
// we cannot write arrow function directly for callback bcoz it does not have this reference. (reference of userSchema)
// encryption algorithm takes some time so we need to make the function async


// designing custom methods --> injecting methods in our schema
userSchema.methods.isPasswordCorrect = async function(password){
     return await bcrypt.compare(password, this.password) // this.password is encyrpted one
     // compare function returns true or false
} // we are created a new function isPasswordCorrect

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username: this.username,
            fullName: this.fullName, // key: value from db
        }, // payload
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    ) // sign method generates a token
} // no need of async here as it does need a lot of time

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        }, // payload
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    ) 
} // no need of async here
// refresh token contains less info (only id), it is refreshed again and again

export const User = mongoose.model("User", userSchema);

// npm i bcrypt -> helps us to hash our passwords
// npm i jsonwebtoken -> jwt (json web token) -> creates tokens --> jwt has header, payload -- we work on payload (data), whatever data we send in payload gets encrypted -- verify signature (secret) is the things that makes it secure otherwise everyone knwos the algo so anyone can decrypt the data

// pre hook (middleware of mongoose) -> just before saving data, we can run this hook, it is basically a method (any code can be written into this)

// jwt is bearer token -> jo use bear karte he use sahi man lete he -> jo bhi ye bhejega, use data bhej denge