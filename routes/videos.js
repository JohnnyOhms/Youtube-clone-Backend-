const express = require("express");
const Router = express.Router();
const {
  getAllVideo,
  addVideos,
  deleteVideo,
  deleteAllVideo,
} = require("../controllers/videos");

Router.route("/").get(getAllVideo).post(addVideos);
Router.route("/single-delete").post(deleteVideo);
Router.route("/delete-all").delete(deleteAllVideo);

module.exports = Router;
