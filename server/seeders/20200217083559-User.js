'use strict';
const encryptPassword = require('../helpers/generatePassword')

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
   return queryInterface.bulkInsert('Users', 
   [
     {
        name: 'John Doe',
        username: 'jhonDoe',
        email: 'jhondoe@email.com',
        password: encryptPassword('12345') ,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arif Rachman Husen',
        username: 'arif05rachman',
        email: 'arif05rachman@gmail.com',
        password: encryptPassword('12345'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Users', null, {});
    }
};
