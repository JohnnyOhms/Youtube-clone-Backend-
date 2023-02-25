const CustomAPIError = require("./custom-api");
const StatusCode = require("http-status");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
