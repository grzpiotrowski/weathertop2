'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const axios = require("axios");
const stationStore = require('../models/station-store');
const weatherAnalytics = require("../utils/weather-analytics");
const conversion = require("../utils/conversion");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug('Station id = ', stationId);
    const station = stationStore.getStation(stationId);
    weatherAnalytics.updateWeather(station);

    let tempReadings = [];
    tempReadings = stationStore.getAllReadingsOfType(stationId, 'temperature');
    station.tempReadings = tempReadings;

    let dates = [];
    let dateLabels = [];
    dates = stationStore.getAllReadingsOfType(stationId, 'date');
    for (let dateString of dates) {
      const date = new Date(dateString);
      dateLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
    }
    station.dateLabels = dateLabels;

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

  async addOpenWeatherReading(request, response) {
    logger.info("Requesting a new report from OpenWeather API");
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    let reading = {};
    const lat = station.lat;
    const lng = station.lon;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=MY_API_KEY`;

    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const report = result.data;
      reading.id = uuid.v1();
      reading.date = new Date(report.dt * 1000).toISOString();
      reading.code = report.weather[0].id;
      reading.temperature = conversion.kelvinToCelsius(report.main.temp).toFixed(1);
      reading.windSpeed = report.wind.speed;
      reading.pressure = report.main.pressure;
      reading.windDirection = report.wind.deg;
    }
    stationStore.addReading(stationId, reading);
    console.log(reading);
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