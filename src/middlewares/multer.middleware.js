// npm i multer
// multer can be used directly as well but since we might want to use this functionality everytime we want to upload a file, we will create a middleware for multer

import multer from "multer"

// we are using disk storage and not memory storage --> below code is taken from documentation
const storage = multer.diskStorage({
    // multer gives access to file (2nd parameter), cb is callback
    destination: function (req, file, cb) {
      cb(null, "./public/temp") // cb(error handler, destination folder)
    },

    // to make filename unique, we can modify the file name
    // filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    // }

    // keeping filename as it is
    filename: function (req, file, cb) {
    cb(null, file.originalname)
    }
  }) // storage function returns the filename i.e. local path of file
  
  export const upload = multer({ 
    // storage: storage 
    storage,
})