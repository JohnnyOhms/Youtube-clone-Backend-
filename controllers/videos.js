const asyncHandler = require("../middlewares/asyncHandler");
const statusCode = require("http-status");
const Videos = require("../models/videos");
const { CustomAPIError } = require("../errors");

const getAllVideo = asyncHandler(async (req, res, next) => {
  const { sort, search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }

  let result = Videos.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("title");
  }
  if (sort === "z-a") {
    result = result.sort("-title");
  }

  const videos = await result;

  res
    .status(statusCode.OK)
    .json({ success: true, videos, nbHit: videos.length });
});

const addVideos = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user.userId;
  const {
    body: { videoId },
    user: { userId },
  } = req;
  const existVideo = await Videos.findOne({ createdBy: userId, videoId });
  if (existVideo) {
    throw new CustomAPIError("Video already in the Database");
  }
  const videos = await Videos.create({ ...req.body });
  res.status(statusCode.CREATED).json({ success: true, videos });
});

const deleteVideo = asyncHandler(async (req, res, next) => {
  const {
    user: { userId },
    body: { _id: videoId },
  } = req;
  const videos = await Videos.findByIdAndRemove({
    createdBy: userId,
    _id: videoId,
  });
  res.status(statusCode.ACCEPTED).json({ success: true, videos });
});

const deleteAllVideo = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const videos = await Videos.deleteMany({ createdBy: userId });
  res.status(statusCode.OK).json({ sucess: true, videos });
});

module.exports = {
  getAllVideo,
  addVideos,
  deleteVideo,
  deleteAllVideo,
};
