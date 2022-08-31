'use strict';

const axios = require("axios");
const uuid = require("uuid");
const conversion = require("./conversion");

const openWeatherRequests = {

  async getCurrentWeather(lat, lng, api_key) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`;
    let reading = {};
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
    return reading;
  }

}

module.exports = openWeatherRequests;