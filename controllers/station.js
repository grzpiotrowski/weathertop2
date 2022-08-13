'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const stationStore = require('../models/station-store');
const weatherAnalytics = require("../utils/weather-analytics");
const conversion = require("../utils/conversion");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug('Station id = ', stationId);
    const station = stationStore.getStation(stationId);
    if (station.readings.length > 0) {
      station.lastReading = weatherAnalytics.getLastReading(station.readings);
      station.lastReading.temperatureF = conversion.temperatureFahrenheit(station.lastReading.temperature);
      station.lastReading.codeString = conversion.weatherCodes.get(station.lastReading.code);
      station.lastReading.windSpeedBft = conversion.kmhToBeaufort(station.lastReading.windSpeed);
      station.lastReading.windCompass = conversion.azimuthToCompass(station.lastReading.windDirection);
    }
    const viewData = {
      title: station.name + ' - WeatherTop',
      station: station
    };
    response.render('station', viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    stationStore.addReading(stationId, newReading);
    logger.debug('New Reading = ', newReading);
    response.redirect('/station/' + stationId);
  },
}

module.exports = station;