'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', "detail", Sequelize.TEXT);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products', "detail");
  }
};
