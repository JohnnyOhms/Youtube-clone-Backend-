const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      require,
      trim: true,
    },
    title: {
      type: String,
      require,
      minlength: 5,
      trim: true,
    },
    channel: {
      type: String,
      require,
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
