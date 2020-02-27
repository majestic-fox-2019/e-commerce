'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: '3 Days with mysql for your application',
        image_url: 'https://thumbs.gfycat.com/SimpleGlumCaiman-size_restricted.gif',
        stock: 130,
        price: 10000,
        createdAt: 'now',
        updatedAt: 'now',
        CategoryId: 1
      },
      {
        name: 'Buku pemrograman untuk profesional',
        image_url: 'https://media2.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
        stock: 75,
        price: 20000,
        createdAt: 'now',
        updatedAt: 'now',
        CategoryId: 1
      },
      {
        name: 'Odoo Technical For Beginner',
        image_url: 'https://lh3.googleusercontent.com/proxy/w9ez79ww5NWxTedOxa41m8DWL4vBcv7hLdNkfQIGN2poW82ezg097wYpnsEqQD8i182jbOTecS84u7H-eUTVaniS9QtrBu1AnVqVaUDYHw',
        stock: 89,
        price: 150000,
        createdAt: 'now',
        updatedAt: 'now',
        CategoryId: 1
      },
      {
        name: 'React JS With Ant Design',
        image_url: 'https://www.bacancytechnology.com/blog/wp-content/uploads/2019/06/ezgif.com-crop-1.gif',
        stock: 175,
        price: 250000,
        createdAt: 'now',
        updatedAt: 'now',
        CategoryId: 1
      },
      {
        name: 'Mastering React JS SSR with NextJS',
        image_url: 'https://cdn-media-1.freecodecamp.org/images/cOdx8xHzZjMmqEYSTgVkkPSXkG925Hwewoxj',
        stock: 10,
        price: 1250000,
        createdAt: 'now',
        updatedAt: 'now',
        CategoryId: 2
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Products', null, {});
  }
};
