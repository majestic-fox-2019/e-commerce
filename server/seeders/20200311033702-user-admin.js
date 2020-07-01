'use strict';
const { hash } = require("../helpers")
let passwordEncrypt = hash("asd123")

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      fullName: 'mustaqin ishak',
      email: 'mustaqinishak@gmail.com',
      password: passwordEncrypt,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      fullName: 'muammar naupal',
      email: 'muammarnaupal@gmail.com',
      password: passwordEncrypt,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
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
    return queryInterface.bulkDelete('Users', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
