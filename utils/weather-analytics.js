"use strict";

const weatherAnalytics = {

  getLastReading(readings) {
    return readings[readings.length - 1];
  },

  calculateWindChill(temperature, windSpeed) {
    return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16)
      + 0.3965 * temperature * Math.pow(windSpeed, 0.16));
  }

};

module.exports = weatherAnalytics;