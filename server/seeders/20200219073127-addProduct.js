'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: "Dixit",
        price: "400000",
        CategoryId: 1,
        stock: 2,
        image_url: "https://cf.geekdo-images.com/imagepagezoom/img/8WnWnWR-u58DCbhxEwcmtsk5UJQ=/fit-in/1200x900/filters:no_upscale()/pic3483909.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Pandemic Legacy",
        price: "1000000",
        CategoryId: 3,
        stock: 2,
        image_url: "https://cf.geekdo-images.com/imagepagezoom/img/sDqvhEpE9TCCWqDJSbOszGTHoDk=/fit-in/1200x900/filters:no_upscale()/pic2452831.png",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Avalon",
        price: "540000",
        CategoryId: 2,
        stock: 4,
        image_url: "https://cf.geekdo-images.com/imagepagezoom/img/lNnq8X4bF9cdFxyW2bTCPMg9zC4=/fit-in/1200x900/filters:no_upscale()/pic1398895.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Monopoly City",
        price: "300000",
        CategoryId: 2,
        stock: 1,
        image_url: "https://cf.geekdo-images.com/imagepagezoom/img/HTvkQwpf6nqqJahLmJxSMfb7kLs=/fit-in/1200x900/filters:no_upscale()/pic486673.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Code Name",
        price: "300000",
        CategoryId: 1,
        stock: 3,
        image_url: "https://cf.geekdo-images.com/imagepage/img/BwJJTrofiaH0Muxuo5rv0VCmuCY=/fit-in/900x600/filters:no_upscale()/pic2582929.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "The Resistance",
        price: "500000",
        CategoryId: 2,
        stock: 1,
        image_url: "https://cf.geekdo-images.com/imagepage/img/s5SyMXpHKpG_C-Lentt3BT7dkT8=/fit-in/900x600/filters:no_upscale()/pic2576459.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
