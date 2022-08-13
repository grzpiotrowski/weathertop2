'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const stationStore = require('../models/station-store');
const weatherAnalytics = require('../utils/weather-analytics');
const conversion = require('../utils/conversion');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    let stations = [];
    for (let station of stationStore.getAllStations()) {
      weatherAnalytics.updateWeather(station);
      stations.push(station);
    };

    const viewData = {
      title: 'Dashboard - WeatherTop',
      stations: stations
    };
    response.render('dashboard', viewData);
  },

  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      readings: [],
    };
    logger.debug('Creating a new Station', newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
