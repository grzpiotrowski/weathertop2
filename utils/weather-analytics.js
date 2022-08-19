'use strict';

const conversion = require('./conversion');
const _ = require('lodash');
const weatherAnalytics = {

  updateWeather(station) {
    if (station.readings.length > 0) {
      station.lastReading = this.getLastReading(station.readings);
      station.lastReading.temperatureF = conversion.temperatureFahrenheit(station.lastReading.temperature).toFixed(1);
      station.lastReading.codeString = conversion.currentWeather(station.lastReading.code);
      station.lastReading.windSpeedBft = conversion.kmhToBeaufort(station.lastReading.windSpeed);
      station.lastReading.windCompass = conversion.azimuthToCompass(station.lastReading.windDirection);
      station.lastReading.windChill = weatherAnalytics.calculateWindChill(station.lastReading.temperature,
        station.lastReading.windSpeed).toFixed(1);

      station.maxTemp = _.maxBy(station.readings, 'temperature').temperature;
      station.minTemp = _.minBy(station.readings, 'temperature').temperature;
      station.maxPressure = _.maxBy(station.readings, 'pressure').pressure;
      station.minPressure = _.minBy(station.readings, 'pressure').pressure;
      station.maxWind = _.maxBy(station.readings, 'windSpeed').windSpeed;
      station.minWind = _.minBy(station.readings, 'windSpeed').windSpeed;

      station.tempTrend = weatherAnalytics.tempTrend(station.readings);
      station.windTrend = weatherAnalytics.windTrend(station.readings);
      station.pressureTrend = weatherAnalytics.pressureTrend(station.readings);

      station.weatherIcon = conversion.weatherIcon(station.lastReading.code);
    }
  },

  getLastReading(readings) {
    return readings[readings.length - 1];
  },

  calculateWindChill(temperature, windSpeed) {
    return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16)
      + 0.3965 * temperature * Math.pow(windSpeed, 0.16));
  },

  tempTrend(readings) {
    let trend = 0;
    if (readings.size() > 2) {
      let values = [ readings[readings.size()-3].temperature, readings[readings.size()-2].temperature, readings[readings.size()-1].temperature ];
      trend = this.calcTrend(values);
    }
    return trend;
  },

  windTrend(readings) {
    let trend = 0;
    if (readings.size() > 2) {
      let values = [ readings[readings.size()-3].windSpeed, readings[readings.size()-2].windSpeed, readings[readings.size()-1].windSpeed ];
      trend = this.calcTrend(values);
    }
    return trend;
  },

  pressureTrend(readings) {
    let trend = 0;
    if (readings.size() > 2) {
      let values = [ readings[readings.size()-3].pressure,readings[readings.size()-2].pressure, readings[readings.size()-1].pressure ];
      trend = this.calcTrend(values);
    }
    return trend;
  },

  calcTrend(values) {
    let trend = 0;
    if (values.length > 2) {
      if (( values[2] > values[1] ) && (values[1] > values[0])) {
        trend = 1;
      } else if (( values[2] < values[1] ) && (values[1] < values[0])) {
        trend = -1;
      }
    }
    return trend;
  }

};

module.exports = weatherAnalytics;