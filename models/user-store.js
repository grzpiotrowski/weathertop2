'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store.js');

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  updateUser(user, updatedUser) {
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    this.store.save();
  },

  updateUserPassword(user, newPassword) {
    user.password = newPassword;
    this.store.save();
  },

  checkPassword(user, password) {
    return user.password === password;
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
};

module.exports = userStore;