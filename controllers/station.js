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
    weatherAnalytics.updateWeather(station);
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
      date: new Date().toISOString(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    stationStore.addReading(stationId, newReading);
    logger.debug('New Reading = ', newReading);
    response.redirect('/station/' + stationId);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
}

module.exports = station;