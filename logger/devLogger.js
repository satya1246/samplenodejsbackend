const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const devLogger = () => {
  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
  return createLogger({
    level: "debug",
    format: combine(
      label({ label: "index" }),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      myFormat
    ),
    transports: [new transports.Console()],
  });
};

module.exports = devLogger;
