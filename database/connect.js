const mongoose = require("mongoose");

const connect = (url) => {
  return mongoose.set("strictQuery", true).connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
