const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JsonWebToken = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: 15,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

UserSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.method({
  CreateJSONtoken: function () {
    return JsonWebToken.sign(
      { userId: this._id, name: this.name },
      process.env.JSON_KEY,
      process.env.JSON_EXPIRE
    );
  },
});

UserSchema.method({
  ComparePassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
});

module.exports = mongoose.model("User", UserSchema);
