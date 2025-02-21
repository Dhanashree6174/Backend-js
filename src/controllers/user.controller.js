import {asyncHandler} from "../utils/asyncHandler.js"; // wrapper that implements try-catch functionality
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // steps
    // get user details from frontend
    // validation (to check if all values are received and in correct format) - eg: not empty
    // check if user already exists: username, email
    // check for images, check for avatar (multer upload succeful or not)
    // upload images to cloudinary, check avatar (cloudinary upload succesful or not)
    // create user object(since we are using mongodb - nosql db) - create entry in db
    // remove password(although encrypted) and refresh token(although empty) fields from response (mongodb returns all details in reponse)
    // check for user creation (if response is null or valid)
    // return response/error 

    const {fullName, email, username, password} = req.body;
    console.log("email: ",email);
    // we can only handle the data directly, not the files --> so to handle files, we add the middleware in routes

    // if(fullName === ""){
    //     throw new ApiError(400, "Fullname is required");
    // } --> can write multiple if conditions like this but better appproach is :
    if( [fullName, email, username, password].some((field)=> field?.trim() ===""))// if any field is empty, this condition returns true
    {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = User.findOne({
        $or: [{ username }, { email }]
    }) // returns first matching user

    if(existingUser){
        throw new ApiError(409, "User with this  email or username already exists")
    }
    
    const avatarLocalPath = req.files?.avatar[0]?.path; // access to files is given by multer middleware (optional chaining in case we don't have files)
    // first porperty of avatar contains the path added by multer
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required");
    }

    // try{
    const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "", // we don't know if coverImage is provided since its an optional field
            email,
            password, // we are encyrpting password in user model itself
            username: username.toLowerCase()
        })
    // } --> try catch should be use for db operations but since we are using asyncHandler that returns a promise and can handle errors, we won't use try catch here

    // checking is user exists (we can use if condition instead too)
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ); // .select(fields to not include -- syntax: string with space separated column names preceded by -)
    //_id field is added by mongodb

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user"); // 500 --> server error
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
}) // asyncHandler is an higher order function

export {registerUser} // exporting object