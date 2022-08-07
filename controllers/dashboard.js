"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store');
const weatherAnalytics = require('../utils/weather-analytics');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    let stations = [];
    for (let station of stationStore.getAllStations()) {
      station.lastReading = weatherAnalytics.getLastReading(station.readings);
      stations.push(station);
    };
    const viewData = {
      title: "Dashboard - WeatherTop",
      stations: stations
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
