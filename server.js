'use strict';

const express = require('express');
var favicon = require('serve-favicon');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();
app.use(cookieParser());
const exphbs = require('express-handlebars');
var helpers = require('handlebars-helpers');
var customHelpers = require('./views/helpers/customHelpers');
var string = helpers.string();
var comparison = helpers.comparison();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(fileUpload());
app.use(favicon('public/images/favicon.ico'));
app.engine(
  '.hbs',
  exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: customHelpers
  })
);
app.set('view engine', '.hbs');

const routes = require('./routes');
app.use('/', routes);

app.use(function(request, response) {
  response.render('errors/404');
});

const listener = app.listen(process.env.PORT || 4000, function() {
  logger.info(`WeatherTop2 started on port ${listener.address().port}`);
  
});
