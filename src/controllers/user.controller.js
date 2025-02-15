import {asyncHandler} from "../utils/asyncHandler.js"; // wrapper that implements try-catch functionality

const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "chai aur code"
    })
}) // asyncHandler is an higher order function

export {registerUser} // exporting object