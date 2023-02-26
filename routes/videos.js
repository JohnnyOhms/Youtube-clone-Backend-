const express = require("express");
const Router = express.Router();
const {
  getAllVideo,
  addVideos,
  deleteVideo,
  deleteAllVideo,
} = require("../controllers/videos");

Router.route("/").get(getAllVideo).post(addVideos).delete(deleteAllVideo);
Router.route("/:id").delete(deleteVideo);

module.exports = Router;
