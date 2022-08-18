'use strict';

const conversion = {

  currentWeather(code) {
    const weatherCodes = new Map([
      [100, 'Clear'],
      [200, 'Partial Clouds'],
      [300, 'Cloudy'],
      [400, 'Light Showers'],
      [500, 'Heavy Showers'],
      [600, 'Rain'],
      [700, 'Snow'],
      [800, 'Thunder']
    ]);
    return weatherCodes.get(code);
  },

  weatherIcon(code) {
    const weatherIcons = new Map([
      [100, 'sun'],
      [200, 'cloud sun'],
      [300, 'cloud'],
      [400, 'cloud sun rain'],
      [500, 'cloud showers heavy'],
      [600, 'cloud rain'],
      [700, 'snowflake'],
      [800, 'bolt']
    ]);
    return weatherIcons.get(code);
  },

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
  },

  azimuthToCompass(azimuth) {
    if (azimuth > 348.75 && azimuth <= 0.0 ||
      azimuth > 0.0 && azimuth <= 11.25) {
      return 'North';
    } else if (azimuth > 11.25 && azimuth <= 33.75) {
      return 'North North East';
    } else if (azimuth > 33.75 && azimuth <= 56.25) {
      return 'North East';
    } else if (azimuth > 56.25 && azimuth <= 78.75) {
      return 'East North East';
    } else if (azimuth > 78.75 && azimuth <= 101.25) {
      return 'East';
    } else if (azimuth > 101.25 && azimuth <= 123.75) {
      return 'East South East';
    } else if (azimuth > 123.75 && azimuth <= 146.25) {
      return 'South East';
    } else if (azimuth > 146.25 && azimuth <= 168.75) {
      return 'South South East';
    } else if (azimuth > 168.75 && azimuth <= 191.25) {
      return 'South';
    } else if (azimuth > 191.25 && azimuth <= 213.75) {
      return 'South South West';
    } else if (azimuth > 213.75 && azimuth <= 236.25) {
      return 'South West';
    } else if (azimuth > 236.25 && azimuth <= 258.75) {
      return 'West South West';
    } else if (azimuth > 258.75 && azimuth <= 281.25) {
      return 'West';
    } else if (azimuth > 281.25 && azimuth <= 303.75) {
      return 'West North West';
    } else if (azimuth > 303.75 && azimuth <= 326.25) {
      return 'North West';
    } else if (azimuth > 326.25 && azimuth <= 348.75) {
      return 'North North West';
    } else {
      return 'Unknown';
    }
  },
  
  

};

module.exports = conversion;