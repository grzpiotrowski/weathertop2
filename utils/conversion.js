"use strict";

const conversion = {
  weatherCodes: new Map([
    [100, 'Clear'],
    [200, 'Partial Clouds'],
    [300, 'Cloudy'],
    [400, 'Light Showers'],
    [500, 'Heavy Showers'],
    [600, 'Rain'],
    [700, 'Snow'],
    [800, 'Thunder']
  ]),

  temperatureFahrenheit(tempC) {
    return (tempC * 1.8) + 32;
  },

  kmhToBeaufort(kmh) {
    if (kmh <= 1) {
      return 0;
    } else if (kmh > 1 && kmh <= 5) {
      return 1;
    } else if (kmh > 5 && kmh <= 11) {
      return 2;
    } else if (kmh > 11 && kmh <= 19) {
      return 3;
    } else if (kmh > 19 && kmh <= 28) {
      return 4;
    } else if (kmh > 28 && kmh <= 38) {
      return 5;
    } else if (kmh > 38 && kmh <= 49) {
      return 6;
    } else if (kmh > 49 && kmh <= 61) {
      return 7;
    } else if (kmh > 61 && kmh <= 74) {
      return 8;
    } else if (kmh > 74 && kmh <= 88) {
      return 9;
    } else if (kmh > 88 && kmh <= 102) {
      return 10;
    } else if (kmh > 102 && kmh <= 117) {
      return 11;
    } else {
      return 12;
    }
  }

};

module.exports = conversion;