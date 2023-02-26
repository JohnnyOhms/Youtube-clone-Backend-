const express = require("express");
const Router = express.Router();
const {
  register,
  login,
  forgetPassword,
  resetPassword,
  confirmResetPassword,
} = require("../controllers/auth");

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/forgetPassword").post(forgetPassword);
Router.route("/resetPassword/:_id/:token").get(resetPassword);
Router.route("/confirmResetPassword").post(resetPassword);

module.exports = Router;
