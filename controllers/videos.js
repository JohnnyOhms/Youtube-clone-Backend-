const asyncHandler = require("../middlewares/asyncHandler");
const statusCode = require("http-status");
const Videos = require("../models/videos");

const getAllVideo = asyncHandler(async (req, res, next) => {
  res.status(statusCode.OK).json({ success: true, video: "get  all videos" });
});

const addVideos = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user.userId;
  const videos = await Videos.create({ ...req.body });
  res
    .status(statusCode.CREATED)
    .json({ success: true, videos, nbHit: videos.length });
});

module.exports = {
  getAllVideo,
  addVideos,
};
