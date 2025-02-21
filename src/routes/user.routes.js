// all urls are defined here
import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router() // similar to creating express app

router.route("/register").post(
    upload.fields([
        {
            name: "avatar", // name of fie (should be same in frontend)
            maxCount: 1 // how many files to accept for this field
        },
        {
            name: "coverImage",
            maxCount: 1,
        } // 2 objects -> 1 for each file field
    ]), // fields() processes multiple files, it is provided by upload function given by multer
    registerUser
); // url : "/api/v1/users/register"
// midddleware is added just before the method to execute => .post(middleware , method)

export default router // we can import using whatever name we want when we are using export default