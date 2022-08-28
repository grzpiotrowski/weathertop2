'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const stationStore = require('../models/station-store');
const weatherAnalytics = require('../utils/weather-analytics');
const utilsTools = require('../utils/utilsTools');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser === undefined) {
      response.redirect('/login');
    }
    let stations = [];
    for (let station of stationStore.getUserStations(loggedInUser.id)) {
      weatherAnalytics.updateWeather(station);
      stations.push(station);
    }
    stations.sort(utilsTools.compareStrings);

    const viewData = {
      title: 'Dashboard - WeatherTop',
      stations: stations
    };
    response.render('dashboard', viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
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
