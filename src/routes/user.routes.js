// all urls are defined here
import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js"

const router = Router() // similar to creating express app

router.route("/register").post(registerUser); // url : "/api/v1/users/register"

export default router // we can import using whatever name we want when we are using export default