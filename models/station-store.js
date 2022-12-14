'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require("../utils/logger");
const weatherAnalytics = require("../utils/weather-analytics");

const stationStore = {

  store: new JsonStore('./models/station-store.json', { stationCollection: [] }),
  collection: 'stationCollection',

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  getAllReadingsOfType(id, property) {
    const station = this.getStation(id);
    return _.map(station.readings, _.property(property));
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId});
    this.store.save();
  },

  clearTrends(station) {
    station.lastReading = {};
    station.minTemp = undefined;
    station.maxTemp = undefined;
    station.minPressure = undefined;
    station.maxPressure = undefined;
    station.minWind = undefined;
    station.maxWind = undefined;
    station.tempTrend = undefined;
    station.pressureTrend = undefined;
    station.windTrend = undefined;
    station.weatherIcon = undefined;
    this.store.save();
  }

};


module.exports = stationStore;