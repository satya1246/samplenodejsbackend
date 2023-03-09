const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json } = format;

const qaLogger = () => {
  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
  return createLogger({
    level: "info",
    format: combine(label({ label: "index" }), timestamp(), json(), myFormat),
    transports: [new transports.Console()],
  });
};
module.exports = qaLogger;
