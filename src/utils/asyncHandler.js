// requestHandler is the name of our function
const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        // creating a promise manually, catch = reject
        Promise
        .resolve(requestHandler(req,res,next))
        .catch((err) => next(err)) // pass it to allow others to do their work ?
    }
};

export {asyncHandler};

// we can write this asynchHandler using try catch as well as using promises

// we are basically making a wrapper function that takes a function to be executed at multiple places as an arguments and executes it in its body

// using try catch
// const asyncHandler = (fn) => async (req, res, next) => {
//     try{
//         await fn(req,res,next);
//     } catch(error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         }); // send status as well as json object in response
//     }
// }; // it is a higher order function -> takes function as a parameter or returns a function
// asyncHandler is already a callback function to execute another function in it(fn) we need to add one more () => {}  
// const asyncHandler = (fn) => { () => {} } // pass fn to one more function

// next parameter is used in middlewares