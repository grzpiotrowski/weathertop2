"use strict";

const conversion = require("./conversion");
const weatherAnalytics = {

  updateWeather(station) {
    if (station.readings.length > 0) {
      const lastReading = this.getLastReading(station.readings);
      station.lastReading = lastReading;
      station.lastReading.temperatureF = conversion.temperatureFahrenheit(station.lastReading.temperature);
      station.lastReading.codeString = conversion.currentWeather(station.lastReading.code);
      station.lastReading.windSpeedBft = conversion.kmhToBeaufort(station.lastReading.windSpeed);
      station.lastReading.windCompass = conversion.azimuthToCompass(station.lastReading.windDirection);
      station.lastReading.windChill = weatherAnalytics.calculateWindChill(station.lastReading.temperature,
        station.lastReading.windSpeed);
    };
  },

  getLastReading(readings) {
    return readings[readings.length - 1];
  },

  calculateWindChill(temperature, windSpeed) {
    return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16)
      + 0.3965 * temperature * Math.pow(windSpeed, 0.16));
  }

};

module.exports = weatherAnalytics;