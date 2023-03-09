"use strict";
const serverless = require("serverless-http");
const app = require("./app");

module.exports.index = serverless(app);
