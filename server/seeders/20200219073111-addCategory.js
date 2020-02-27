'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      category: 'Party Game',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category: 'Negotiation',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category: 'Strategy',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
