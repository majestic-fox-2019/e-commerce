'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('Products', 
        [
          {
            name: 'Bag Carrier',
            image_url: 'image_url/carrier.jpg',
            price: '1000000',
            stock: 30,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Boots',
            image_url: 'image_url/boots.jpg',
            price: '500000',
            stock: 30,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Products', null, {});
  }
};
