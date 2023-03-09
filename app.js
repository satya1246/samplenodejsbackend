const express = require("express");

const helloWorldRouter = require("./routes/helloWorldRouter");
const cors = require("cors");
const app = express();
const { incomingReqLogger, afterExecutionLogger, errorLogger } = require("./appLogger");

//Global Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ limit: "10kb" }));

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Routes
app.use(incomingReqLogger);
app.use("/", helloWorldRouter);
if (!(process.env.NODE_ENV == "test")) {
  app.use(afterExecutionLogger);
  app.use(errorLogger);
}

module.exports = app;
