"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station");
const accounts = require("./controllers/accounts");

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get('/station/:id', station.index);
router.post('/dashboard/addstation', dashboard.addStation);
router.post('/station/:id/addreading', station.addReading);

router.get('/signup', accounts.signup);
router.post('/register', accounts.register);

module.exports = router;
