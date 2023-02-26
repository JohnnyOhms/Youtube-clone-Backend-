const User = require("../models/users");
const statusCode = require("http-status");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const asyncHandler = require("../middlewares/asyncHandler");
const JsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const URL = "http://localhost:5000/api/v1/auth";

const register = asyncHandler(async (req, res, next) => {
  const user = await User.create({ ...req.body });
  const create = new User();
  const token = create.CreateJSONtoken();
  return res
    .status(statusCode.CREATED)
    .json({ success: true, user: { user: user.name, token } });
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
    .json({ success: true, user: { user: user.name, token } });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("No user found for this email");
  }
  const token = user.CreateJSONtoken();
  const link = `${URL}/resetPassword/${user._id}/${token}`;
  // res.redirect(statusCode.TEMPORARY_REDIRECT, link)
  console.log(link);
  return res.status(statusCode.OK).json({ success: true, email: user.email });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { _id, token } = req.params;
  const user = await User.findOne({ _id });
  if (!user) {
    throw new UnauthenticatedError("No user found for this email");
  }
  const decode = JsonWebToken.verify(token, process.env.JSON_KEY);
  req.user = { ...req.user, ...decode };
  const link = `${URL}/confirmResetPassword/${decode.userId}`;
  console.log(link);
  return res.status(statusCode.OK).json({ success: true, user: decode.email });
});

const confirmResetPassword = asyncHandler(async (req, res) => {
  const {
    params: { userId: _id },
    body: { password },
  } = req;
  const salt = await bcrypt.genSalt(10);
  const changedPassword = await bcrypt.hash(password, salt);
  const user = await User.findByIdAndUpdate(
    _id,
    { $set: { password: changedPassword } },
    { new: true }
  );
  if (!user) {
    throw new UnauthenticatedError("updating password failed for this email");
  }
  return res.status(statusCode.OK).json({ success: true });
});

module.exports = {
  register,
  login,
  forgetPassword,
  resetPassword,
  confirmResetPassword,
};
