'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const station = require('./controllers/station');
const accounts = require('./controllers/accounts');

router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/station/:id', station.index);
router.post('/dashboard/addstation', dashboard.addStation);
router.get('/dashboard/deletestation/:id', dashboard.deleteStation);
router.post('/station/:id/addreading', station.addReading);
router.get('/station/:id/deletereading/:readingid', station.deleteReading);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/accountsettings', accounts.settings);
router.get('/securitysettings', accounts.authenticationSettings);

module.exports = router;
