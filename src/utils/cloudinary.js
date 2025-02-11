// file is already on local server(and provided by file system) and now we will give 'local path' and put it on cloudinary
// once file is succefully put on cloudinary, we will then remove it from our local server 
// when file is deleted from our server, it is basically unlinked from the file system(linked-unliked concept)

import {v2 as cloudinary} from "cloudinary"; // naming v2 as cloudinary is a commonly followed pratice so we are using it here
import fs from "fs"; // fs is file system, node gives file system fs, we get it by default in node js -> it is used to read, write, remove files

// configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null; // or return an error msg

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resouce_type: "auto" // detect file type automatically (we can also specify the particular file type)
        }); // more parameters are also available to be passed (second parameter of function -> options -> passed as object)

        // file has been uploaded succesfully
        console.log("File is uploaded on cloudinary", response.url); // response.url gives the public url of file after being uploaded

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // Sync matlab ye kam hona hi chahiye and then go ahead -> do it in synchronous way
        // removes the locally saved file as the upload operation failed
        return null;
    }
} // file uploading requires some time so use async await, also it may cause trouble so use try catch

export {uploadOnCloudinary}; 

// npm i cloudinary

// file upload using cloudinary is a reusable code

// we will take access of file uploaded by user using multer, store it on our local server for sometime (allowing reupload of files by user) and get the file from our local server and store it onto cloudinary server --> so this is a two step process

// cloudinary file/function can be written is utils folder or service folder

