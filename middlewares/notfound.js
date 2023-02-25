const statusCode = require("http-status");

const notFound = (req, res) => {
  res
    .status(statusCode.NOT_FOUND)
    .send({ sucess: false, mssg: "Page not found" });
};

module.exports = notFound;
