'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = bcrypt.hashSync('testtest', 10)

    return queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: "admin@gmail.com",
      password: password,
      role: 'Admin',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
