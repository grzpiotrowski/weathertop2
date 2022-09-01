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
    response.cookie('authToken', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Signup - WeatherTop',
    };
    response.render('signup', viewData);
  },

  settings(request, response) {
    const loggedInUser = userstore.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: 'Settings - WeatherTop',
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName
      };
      response.render('accountsettings', viewData);
    } else {
      response.redirect('/login');
    }
  },

  authenticationSettings(request, response) {
    const loggedInUser = userstore.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: 'Settings - WeatherTop',
        email: loggedInUser.email,
      };
      response.render('securitysettings', viewData);
    } else {
      response.redirect('/login');
    }
  },

  register(request, response) {
    const user = request.body;

    let errormessages = [];
    if (userstore.isEmailTaken(request.body.email)) {
      logger.info("Email already taken: " + request.body.email);
      errormessages.push("Email already taken.");
    }
    if (request.body.email === "") {
      errormessages.push("Email is required.");
    }
    if (request.body.password === "") {
      errormessages.push("Password is required.");
    }
    if (request.body.firstname === "") {
      errormessages.push("First Name is required.");
    }
    if (request.body.lastname === "") {
      errormessages.push("Last Name is required.");
    }

    if (errormessages.length === 0) {
      logger.info(`Registering new user: ${user.email}`);
      user.id = uuid.v1();
      userstore.addUser(user);
      response.redirect("/");
    } else {
      const viewData = {
        title: "Signup - WeatherTop",
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        errors: errormessages
      }
      response.render("signup", viewData);
    }
  },

  authenticate(request, response) {
    let errormessages = [];
    const user = userstore.getUserByEmail(request.body.email);
    if (user !== undefined && userstore.checkPassword(user, request.body.password)) {
      response.cookie('authToken', user.email);
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
    const loggedInUser = userstore.getCurrentUser(request);
    let messages = [];
    const updatedUser = {
      "firstName": request.body.firstname,
      "lastName": request.body.lastname
    };
    userstore.updateUser(loggedInUser, updatedUser);
    messages.push('Personal details updated!');
    const viewData = {
      title: 'Settings - WeatherTop',
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      messages: messages
    };
    response.render('accountsettings', viewData);
  },

  changeUserPassword(request, response) {
    const loggedInUser = userstore.getCurrentUser(request);
    const oldPassword = request.body.oldpassword
    const newPassword = request.body.newpassword;
    const newPasswordConfirm = request.body.newpasswordconfirm;
    let errormessages = [];
    let messages = [];

    if (newPassword === newPasswordConfirm) {
      if (userstore.checkPassword(loggedInUser, oldPassword)) {
        userstore.updateUserPassword(loggedInUser, newPassword);
        messages.push('Password changed successfully!');
      } else {
        errormessages.push('Incorrect old password.');
      }
    } else {
      errormessages.push('New password does not match.');
    }
    const viewData = {
      title: 'Settings - WeatherTop',
      errors: errormessages,
      messages: messages
    };

    response.render('securitysettings', viewData);
  },
};

module.exports = accounts;
