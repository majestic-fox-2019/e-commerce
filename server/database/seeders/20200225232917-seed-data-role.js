'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Roles', [
        {name: 'super_admin', createdAt: new Date(), updatedAt: new Date()},
        {name: 'admin', createdAt: new Date(), updatedAt: new Date()},
        {name: 'member', createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', null, {});
  }
};