require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./database/connect");

// security packages
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");

// routers
const authRouter = require("./routes/auth");
const videoRouter = require("./routes/videos");

// middlewares
const notFoundMiddleware = require("./middlewares/notfound");
const erroHandlerMiddleware = require("./middlewares/error-handler");
const authMiddleware = require("./middlewares/authentication");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send("My YoutubeV2.0 end point server");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/videos", authMiddleware, videoRouter);
app.use(notFoundMiddleware);
app.use(erroHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connect(process.env.CONNECT_DB);
    console.log("connected to db");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
    console.log("something went wrong");
  }
};
start();
