const devLogger = require("./devLogger");
const prodLogger = require("./prodLogger");
const qaLogger = require("./qaLogger");
const devOfflineLogger = require("./devOfflineLogger");
let logger;
if (process.env.selectedEnv === "dev") {
  if (process.env.IS_OFFLINE) {
    logger = devOfflineLogger();
  } else {
    logger = devLogger();
  }
}

if (process.env.selectedEnv === "qa") {
  logger = qaLogger();
}
if (process.env.selectedEnv === "prod") {
  logger = prodLogger();
}
module.exports = logger;
