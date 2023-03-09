const logger = require("./logger");
const errorHandlerConfig = require("./config/errorHandlerConfig.json");
const defaultConfig = require("./config/config");
//const defaultConfig = require("./config/defaultConfig.js");
function incomingReqLogger(req, res, next) {
  let log = ``;
  if (req.method == "GET") {
    log = `MethodType : ${req.method}, Method : ${req.url}`;
  } else {
    log = `MethodType : ${req.method}, MethodName : ${req.url}, RequestBody : ${JSON.stringify(
      req.body
    )}`;
  }

  logger.info(log);
  next();
}
const getActualRequestDurationInSeconds = (start) => {
  const NS_PER_SEC = 1e9; // convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
function afterExecutionLogger(req, res) {
  const start = process.hrtime();
  const durationInSeconds = getActualRequestDurationInSeconds(start);
  let log = `MethodType : ${req.method}, Method : ${req.url}, Status : ${
    res.statusCode
  }, Execution Time : ${durationInSeconds.toLocaleString()} s`;
  logger.info(log);
}

function errorLogger(error, req, res, next) {
  let errorObj = errorHandlerConfig[error.message];
  if (errorObj == undefined) {
    errorObj = errorHandlerConfig[defaultConfig.defaultErrorMessage];
  }
  res.status(errorObj.statusCode).send({
    status: errorObj.status,
    message: errorObj.errorDescription + error.message,
  });
  let log = `MethodType : ${req.method}, Method : ${req.url}, Status : ${res.statusCode} , Error : ${error.stack}`;
  logger.error(log);
}

module.exports = {
  incomingReqLogger,
  afterExecutionLogger,
  errorLogger,
};
