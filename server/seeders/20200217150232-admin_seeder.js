'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name : 'Admin E-Commerce',
        email : 'admin@mail.com',
        password : '$2a$10$x4Id6XUnITmguxZDYqKiR.OUxvVfYI2efisdZ035h0vedO8yFRLO.',
        roles : 'admin',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
