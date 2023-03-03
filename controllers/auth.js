const User = require("../models/users");
const statusCode = require("http-status");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const asyncHandler = require("../middlewares/asyncHandler");
const JsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const upload = require("../middlewares/imageUpload")
const renderURL = "http://localhost:3000/auth/reset-password";
const URL = "http://localhost:5000/api/v1/auth";
const fs = require("node:fs");
const path = require("node:path");
const multer = require("multer");

// SET STORAGE

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

const register = asyncHandler(async (req, res) => {
  // const image = {
  //   data: fs.readFileSync(
  //     path.join(__dirname + "/uploads/" + "1672832830219.jpg")
  //   ),
  //   contentType: "image/png",
  // };

  // console.log(image);

  const user = await User.create({ ...req.body });
  const create = new User();
  const token = create.CreateJSONtoken();
  return res.status(statusCode.CREATED).json({
    success: true,
    user: { user: user.name, userImg: user.userImg, token },
  });
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
  return res.status(statusCode.CREATED).json({
    success: true,
    user: { user: user.name, userImg: user.userImg, token },
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("No user found for this email");
  }
  const token = user.CreateJSONtoken();
  return res.status(statusCode.OK).json({ success: true, id: user._id, token });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { _id, token } = req.body;
  const user = await User.findOne({ _id });
  if (!user) {
    throw new UnauthenticatedError("No user found for this email");
  }
  const decode = JsonWebToken.verify(token, process.env.JSON_KEY);
  req.user = { ...req.user, ...decode };
  return res
    .status(statusCode.OK)
    .json({ success: true, userId: decode.userId });
});

const confirmResetPassword = asyncHandler(async (req, res) => {
  const { _id, ConfirmPassword: password } = req.body;
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
