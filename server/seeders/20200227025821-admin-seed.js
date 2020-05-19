'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('Users', [{
          name: 'admin',
          email: 'admin@skin-care.com',
          password: '$2b$06$Ef39m.xNYnIFUZcED0p7LeacX1oD.WZ9oDADewmRq90TCmCOK1TrS',
          phone_number: '082116912705',
          address: 'tanah kusir',
          role: 'admin',
          createdAt: new Date,
          updatedAt: new Date
        }], {});
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