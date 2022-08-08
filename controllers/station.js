'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store');
const weatherAnalytics = require("../utils/weather-analytics");
const conversion = require("../utils/conversion");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug('Station id = ', stationId);
    const station = stationStore.getStation(stationId);
    station.lastReading = weatherAnalytics.getLastReading(station.readings);
    station.lastReading.temperatureF = conversion.temperatureFahrenheit(station.lastReading.temperature);
    station.lastReading.codeString = conversion.weatherCodes.get(station.lastReading.code);
    station.lastReading.windSpeedBft = conversion.kmhToBeaufort(station.lastReading.windSpeed);
    const viewData = {
      title: station.name + ' - WeatherTop',
      station: station
    };
    response.render('station', viewData);
  }
}

module.exports = station;