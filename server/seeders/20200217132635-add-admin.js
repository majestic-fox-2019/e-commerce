'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Admin',
      email: 'admin@mail.com',
      password: '$2a$10$Oo8/7MdvuM55TMwFBqyLoO0GNtlnEZQVtTwPfw5fRu0kbOWXuPfCO',
      role: 'admin',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
