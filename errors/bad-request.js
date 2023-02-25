const CustomAPIError = require("./custom-api");
const StatusCode = require("http-status");

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
