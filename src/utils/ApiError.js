// setting generalised format for errors
class ApiError extends Error {
    constructor( 
        statusCode, 
        message = "Something went wrong",
        errors = [], // used array for multiple errors
        stack="" // error stack, passing empty by default
    ){
        super(message); // overwriting constructor of base class
        // writing additional elements
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false; // we are handling api errors here, not response
        this.errors = errors;

        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.consturctor) // passing instance into stack trace
        }
    }
}
// node provides Error class, we want to overwrite certain methods of this class so that we can customize the way our errors are sent, hence we are inheriting the Error class

export {ApiError};

// to generalise response format, we are using the req, res from express and express does not actually provide an explicit class for response like node did for errors, but we can write our own class for response (ie, no need to extend any other class and overwrite stuff)

