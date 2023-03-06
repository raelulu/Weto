const express = require("express");
const controller = require("../controller/weather");
const router = express.Router();

router.post("/today_weather", controller.today_weather);

module.exports = router;