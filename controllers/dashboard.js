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
      if (station.readings.length > 0) {
        station.lastReading = weatherAnalytics.getLastReading(station.readings);
        station.lastReading.temperatureF = conversion.temperatureFahrenheit(station.lastReading.temperature);
        station.lastReading.codeString = conversion.weatherCodes.get(station.lastReading.code);
        station.lastReading.windSpeedBft = conversion.kmhToBeaufort(station.lastReading.windSpeed);
        station.lastReading.windCompass = conversion.azimuthToCompass(station.lastReading.windDirection);
        station.lastReading.windChill = weatherAnalytics.calculateWindChill(station.lastReading.temperature,
          station.lastReading.windSpeed);
      }
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
