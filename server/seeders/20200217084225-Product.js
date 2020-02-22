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
            image_url: 'https://eigerindostore.com/media/catalog/product/9/1/910003757001_1.jpg',
            price: '1000000',
            stock: 30,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Boots',
            image_url: 'https://eigerindostore.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/9/1/910003775009_1.jpg',
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
