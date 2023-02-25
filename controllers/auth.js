const User = require("../models/users");
const statusCode = require("http-status");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const asyncHandler = require("../middlewares/asyncHandler");

const register = asyncHandler(async (req, res, next) => {
  const user = await User.create({ ...req.body });
  const create = new User();
  const token = create.CreateJSONtoken();
  return res
    .status(statusCode.CREATED)
    .json({ sucess: true, user: { user: user.name, token } });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Request failed, try agin later");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("email not Found");
  }
  const comfirmPassword = user.ComparePassword(password);
  if (!comfirmPassword) {
    throw new UnauthenticatedError("Invalid password");
  }
  const token = user.CreateJSONtoken();
  return res
    .status(statusCode.CREATED)
    .json({ sucess: true, user: { user: user.name, token } });
});

module.exports = {
  register,
  login,
};
