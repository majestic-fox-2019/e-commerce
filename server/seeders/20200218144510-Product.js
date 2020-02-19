'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Arduino Uno',
        description: 'Mikrokontroller',
        image_url: 'https://store-cdn.arduino.cc/usa/catalog/product/cache/1/image/520x330/604a3538c15e081937dbfbd20aa60aad/a/0/a000066_featured_5.jpg',
        price: '500000',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arduino Mega',
        description: 'Mikrokontroller',
        image_url: 'https://store-cdn.arduino.cc/usa/catalog/product/cache/1/image/520x330/604a3538c15e081937dbfbd20aa60aad/a/0/a000067_featured_1_.jpg',
        price: '800000',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arduino Nano',
        description: 'Mikrokontroller',
        image_url: 'https://store-cdn.arduino.cc/usa/catalog/product/cache/1/image/520x330/604a3538c15e081937dbfbd20aa60aad/A/0/A000005_featured_2.jpg',
        price: '400000',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
