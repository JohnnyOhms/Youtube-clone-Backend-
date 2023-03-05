const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: [true, "Provide a valid field"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Provide a valid field"],
      minlength: 5,
      trim: true,
    },
    channel: {
      type: String,
      required: [true, "Provide a valid field"],
      trim: true,
    },
    videoId: {
      type: String,
      required: [true, "Provide a valid field"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Videos", videoSchema);
