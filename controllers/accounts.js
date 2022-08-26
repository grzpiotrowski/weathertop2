'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const { log } = require("winston");

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Home - WeatherTop',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login - WeatherTop',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('station', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Signup - WeatherTop',
    };
    response.render('signup', viewData);
  },

  settings(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Settings - WeatherTop',
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName
    };
    response.render('accountsettings', viewData);
  },

  authenticationSettings(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Settings - WeatherTop',
      email: loggedInUser.email,
    };
    response.render('securitysettings', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    let errormessages = [];
    const user = userstore.getUserByEmail(request.body.email);
    if (user !== undefined && userstore.checkPassword(user, request.body.password)) {
      response.cookie('station', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      const viewData = {
        title: 'Login - WeatherTop',
        errors: errormessages
      };
      errormessages.push('Incorrect login or password!');
      response.render('login', viewData);
    }
  },

  changeUserDetails(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const updatedUser = {
      "firstName": request.body.firstname,
      "lastName": request.body.lastname
    };
    userstore.updateUser(loggedInUser, updatedUser);
    response.redirect('/accountsettings');
  },

  changeUserPassword(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const oldPassword = request.body.oldpassword
    const newPassword = request.body.newpassword;
    if (oldPassword===loggedInUser.password) {
      userstore.updateUserPassword(loggedInUser, newPassword);
    };
    response.redirect('/securitysettings');
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;
