const { UnauthenticatedError } = require("../errors");
const JsonWebToken = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next(new UnauthenticatedError("Authentication invalid"));
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = JsonWebToken.verify(token, process.env.JSON_KEY);
    req.user = { userId: decode.userId, name: decode.userName };
    next();
  } catch (error) {
    next(new UnauthenticatedError("Authentication invalid"));
  }
};

module.exports = auth;
