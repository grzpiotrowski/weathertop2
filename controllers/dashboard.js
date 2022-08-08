'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store');
const weatherAnalytics = require('../utils/weather-analytics');
const conversion = require('../utils/conversion');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    let stations = [];
    for (let station of stationStore.getAllStations()) {
      station.lastReading = weatherAnalytics.getLastReading(station.readings);
      station.lastReading.temperatureF = conversion.temperatureFahrenheit(station.lastReading.temperature);
      station.lastReading.codeString = conversion.weatherCodes.get(station.lastReading.code);
      station.lastReading.windSpeedBft = conversion.kmhToBeaufort(station.lastReading.windSpeed);
      stations.push(station);
    };

    const viewData = {
      title: 'Dashboard - WeatherTop',
      stations: stations
    };
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
