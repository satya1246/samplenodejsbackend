const express = require("express");
const router = express.Router();

const helloWorldController = require("../controller/helloWorldController");

router.get("/health", helloWorldController.gethealth);

module.exports = router;
