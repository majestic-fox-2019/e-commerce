'use strict';

const { hashPassword } = require('../../helpers/bcrypt');

const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@admin.com",
    password: hashPassword("admini"),
    role: "admin",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Sulthon Abdul Malik",
    email: "sulthon.almalik@gmail.com",
    password: hashPassword("secret"),
    role: "customer",
    updatedAt: new Date(),
    createdAt: new Date(),
  }
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
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
