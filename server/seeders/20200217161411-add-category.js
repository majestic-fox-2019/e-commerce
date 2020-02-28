'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Categories', [{
      name: 'Face',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Lips',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Eye',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Brows',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Categories', null, {});
  }
};
