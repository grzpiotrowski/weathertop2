'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require("../utils/logger");

const stationStore = {

  store: new JsonStore('./models/station-store.json', { playlistCollection: [] }),
  collection: 'stationCollection',

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
};


module.exports = stationStore;