'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [
      {
        id: 1,
        UserId: 2,
        ProductId: 1,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        UserId: 2,
        ProductId: 2,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Transactions', null, {});
  }
};
