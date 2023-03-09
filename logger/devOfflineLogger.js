const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json } = format;
var appRoot = require("app-root-path");
var date = new Date().toISOString().slice(0, 10);
var options = {
  file: {
    filename: appRoot + "/logs/" + date + "_commoncallsapi.log",
  },
};
const devOfflineLogger = () => {
  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
  return createLogger({
    level: "debug",
    format: combine(
      // format.colorize(),
      label({ label: "index" }),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      myFormat
    ),
    transports: [new transports.Console(), new transports.File(options.file)],
    exitOnError: false,
  });
};

module.exports = devOfflineLogger;
