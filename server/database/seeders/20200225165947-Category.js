'use strict';

const categories = [
  {
    id: 1,
    name: "Action",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Adventure",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "RPG",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    name: "Strategy",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    name: "Sport",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    name: "Puzzle",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    name: "Novel",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    name: "Indie",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    name: "Fighting",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    name: "Survial",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 11,
    name: "Horror",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 12,
    name: "FPS",
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
    return queryInterface.bulkInsert('Categories', categories, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
