import mongoose from "mongoose";
// import {DB_NAME} from "../constants";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); // mongoose returns an object
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch(error){
        console.log("Mongodb connection error", error);
        process.exit(1) // npde gives access to process, our current application is running in some process and the process here is a reference to that process
    }
}

export default connectDB;

// problem can occur during database connection -> so use try catch
// DB is in another continent --> so use async await since it may need time to retrieve the data