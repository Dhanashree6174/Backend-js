// setting a generalised response
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // above 500 statuscode are as a standard used for error and not response
  }
}
// we will always send the response through this class
