'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        category_name : 'Elektronik',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        category_name : 'Fashion',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        category_name : 'ATK',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
