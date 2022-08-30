'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const stationStore = require('../models/station-store');
const weatherAnalytics = require('../utils/weather-analytics');
const utilsTools = require('../utils/utilsTools');
const userstore = require("../models/user-store");

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = userstore.getCurrentUser(request);
    if (loggedInUser === undefined) {
      response.redirect('/login');
    }
    let stations = [];
    for (let station of stationStore.getUserStations(loggedInUser.id)) {
      weatherAnalytics.updateWeather(station);
      if (station.readings.length > 0) {
        station.displayWeatherCards = true;
      } else {
        station.displayWeatherCards = false;
      }
      stations.push(station);
    }
    stations.sort(utilsTools.compareStrings);

    const viewData = {
      title: 'Dashboard - WeatherTop',
      stations: stations,
    };
    response.render('dashboard', viewData);
  },

  addStation(request, response) {
    const loggedInUser = userstore.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      lat: request.body.latitude,
      lon: request.body.longitude,
      readings: [],
    };
    logger.debug('Creating a new Station', newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info('Deleting station ' + stationId);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  }

};

module.exports = dashboard;
