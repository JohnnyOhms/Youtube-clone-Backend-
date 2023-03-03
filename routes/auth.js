const express = require("express");
const Router = express.Router();
const {
  register,
  login,
  forgetPassword,
  resetPassword,
  confirmResetPassword,
} = require("../controllers/auth");
// const uploadImage = require("../middlewares")

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/forgot-password").post(forgetPassword);
Router.route("/reset-password").post(resetPassword);
Router.route("/confirm-reset-password").put(confirmResetPassword);

module.exports = Router;
