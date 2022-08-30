'use strict';

const conversion = {

  currentWeather(code) {
    const weatherCodes = new Map([
      [200, 'Thunder with light rain'],
      [201, 'Thunder with rain'],
      [202, 'Thunder with heavy rain'],
      [210, 'Light thunderstorm'],
      [211, 'Thunder'],
      [212, 'Heavy thunder'],
      [221, 'Ragged thunder'],
      [230, 'Thunder with light drizzle'],
      [231, 'Thunder with drizzle'],
      [232, 'Thunder with heavy drizzle'],
      [300, 'Light intensity drizzle'],
      [301, 'Drizzle'],
      [302, 'Heavy intensity drizzle'],
      [310, 'Light intensity drizzle rain'],
      [311, 'Drizzle rain'],
      [312, 'Heavy intensity drizzle rain'],
      [313, 'Shower rain and drizzle'],
      [314, 'Heavy shower rain and drizzle'],
      [321, 'Shower drizzle'],
      [500, 'Light rain'],
      [501, 'Moderate rain'],
      [502, 'Heavy intensity rain'],
      [503, 'Very heavy rain'],
      [504, 'Extreme rain'],
      [511, 'Freezing rain'],
      [520, 'Light intensity shower rain'],
      [521, 'Shower rain'],
      [522, 'Heavy intensity shower rain'],
      [531, 'Ragged shower rain'],
      [600, 'Light snow'],
      [601, 'Snow'],
      [602, 'Heavy snow'],
      [611, 'Sleet'],
      [612, 'Light shower sleet'],
      [613, 'Shower sleet'],
      [615, 'Light rain and snow'],
      [616, 'Rain and snow'],
      [620, 'Light shower snow'],
      [621, 'Shower snow'],
      [622, 'Heavy shower snow'],
      [700, 'Snow'],
      [701, 'Mist'],
      [711, 'Smoke'],
      [721, 'Haze'],
      [731, 'Dust'],
      [741, 'Fog'],
      [751, 'Sand'],
      [761, 'Dust'],
      [762, 'Ash'],
      [771, 'Squall'],
      [781, 'Tornado'],
      [800, 'Clear sky'],
      [801, 'Few clouds: 11-25%'],
      [802, 'Scattered clouds: 25-50%'],
      [803, 'Broken clouds: 51-84%'],
      [804, 'Overcast clouds: 85-100%']
    ]);
    return weatherCodes.get(code);
  },

  weatherIcon(code) {
    const weatherIcons = new Map([
      [200, 'bolt'],
      [201, 'bolt'],
      [202, 'bolt'],
      [210, 'bolt'],
      [211, 'bolt'],
      [212, 'bolt'],
      [221, 'bolt'],
      [230, 'bolt'],
      [231, 'bolt'],
      [232, 'bolt'],
      [300, 'cloud sun rain'],
      [301, 'cloud sun rain'],
      [302, 'cloud sun rain'],
      [310, 'cloud sun rain'],
      [311, 'cloud sun rain'],
      [312, 'cloud showers heavy'],
      [313, 'cloud showers heavy'],
      [314, 'cloud showers heavy'],
      [321, 'cloud showers heavy'],
      [500, 'cloud showers heavy'],
      [501, 'cloud rain'],
      [502, 'cloud rain'],
      [503, 'cloud rain'],
      [504, 'cloud rain'],
      [511, 'cloud meatball'],
      [520, 'cloud sun rain'],
      [521, 'cloud showers heavy'],
      [522, 'cloud showers heavy'],
      [531, 'cloud showers heavy'],
      [600, 'snowflake'],
      [601, 'snowflake'],
      [602, 'snowflake'],
      [611, 'snowflake'],
      [612, 'cloud showers heavy'],
      [613, 'cloud showers heavy'],
      [615, 'cloud meatball'],
      [616, 'cloud meatball'],
      [620, 'snowflake'],
      [621, 'snowflake'],
      [622, 'snowflake'],
      [700, 'snowflake'],
      [701, 'smog'],
      [711, 'smog'],
      [721, 'smog'],
      [731, 'smog'],
      [741, 'smog'],
      [751, 'smog'],
      [761, 'smog'],
      [762, 'smog'],
      [771, 'wind'],
      [781, 'wind'],
      [800, 'sun'],
      [801, 'sun'],
      [802, 'cloud sun'],
      [803, 'cloud sun'],
      [804, 'cloud']
    ]);
    return weatherIcons.get(code);
  },

  celsiusToFahrenheit(tempC) {
    return (tempC * 1.8) + 32;
  },

  kelvinToCelsius(tempK) {
    return (tempK - 273.15);
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
  
  dateToFormattedString(date, includeTime) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth()+1).padStart(2, '0');
    let year = String(date.getFullYear());
    let hours = String(date.getHours());
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let dateFormatted = `${day}/${month}/${year}`;

    if (includeTime) {
      dateFormatted += ` ${hours}:${minutes}`;
    }

    return dateFormatted;
  },

};

module.exports = conversion;