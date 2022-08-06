"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard - WeatherTop",
      stations: stationStore.getAllStations()
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
