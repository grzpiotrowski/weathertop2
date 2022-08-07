"use strict";

const weatherAnalytics = {

  getLastReading(readings) {
    return readings[readings.length - 1];
  }

};

module.exports = weatherAnalytics;