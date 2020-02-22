'use strict';
const {hashing} = require('../helper/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Users', [{
      username: 'kevin',
      password: hashing('12345678'),
      email: 'kevintan203@gmail.com',
      role: 'admin',
      createdAt: new Date,
      updatedAt :new Date
     }], {});
    },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', null, {});
  }
};
