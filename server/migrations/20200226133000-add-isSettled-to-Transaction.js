'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Transactions', 'isSettled', { type: Sequelize.BOOLEAN });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Transactions', 'isSettled');
  }
};
