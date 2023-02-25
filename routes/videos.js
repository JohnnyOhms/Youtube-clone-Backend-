const express = require("express");
const Router = express.Router();
const { getAllVideo, addVideos } = require("../controllers/videos");

Router.route("/").get(getAllVideo).post(addVideos);

module.exports = Router;
