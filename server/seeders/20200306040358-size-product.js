'use strict';

const size = [
  {
    name: "S",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "M",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "L",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "XL",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sizes', size, {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sizes', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
