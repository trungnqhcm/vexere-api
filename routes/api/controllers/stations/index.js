const express = require('express');

const stationController = require("./station.controller");
const router = express.Router();

//* create router
router.get("/", stationController.getStations);
router.post("/", stationController.postStations);
router.get("/:id", stationController.getStationsById);
router.put("/:id", stationController.putStationsById);
router.patch("/:id", stationController.patchStationsById);
router.delete("/:id", stationController.deleteStationsById);

module.exports = router;