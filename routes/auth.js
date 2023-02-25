const express = require("express");
const Router = express.Router();
const { register, login } = require("../controllers/auth");

Router.route("/register").post(register);
Router.route("/login").post(login);

module.exports = Router;
