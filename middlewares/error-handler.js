const statusCode = require("http-status");
const { CustumAPIError } = require("../errors");

const erroHandlerMiddleware = (err, req, res, next) => {
  const customErr = {
    statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
    mssg: err.message || "Something went wrong",
  };
  console.log(customErr);

  return res.status(customErr.statusCode).send(customErr.mssg);
};

module.exports = erroHandlerMiddleware;
