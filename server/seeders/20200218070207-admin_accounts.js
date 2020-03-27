'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'admin1',
      email: 'admin1@mail.com',
      address: 'Jakarta',
      password: '$2b$10$deXangTQNFRc7A7K8S/ADeVO4rtHHTiy.3pyrXfbDxiRS.NEOO3oO', // admin1234567
      shopName: 'Official Store',
      phone: '089876543212',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'admin2',
      email: 'admin2@mail.com',
      address: 'Jakarta',
      password: '$2b$10$deXangTQNFRc7A7K8S/ADeVO4rtHHTiy.3pyrXfbDxiRS.NEOO3oO', // admin1234567
      shopName: 'Official Store',
      phone: '081234567892',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
