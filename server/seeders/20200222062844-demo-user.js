'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: '$2b$10$Xhg1HOAbUzVTu7bhILkOWeICqVvh4DsTwV6j20iFbW/6/4pPlAZ8i',
        role: 'Admin',
        createdAt: 'now',
        updatedAt: 'now'
      },
      {
        email: 'kodekite@gmail.com',
        password: '$2b$10$Xhg1HOAbUzVTu7bhILkOWeICqVvh4DsTwV6j20iFbW/6/4pPlAZ8i',
        role: 'User',
        createdAt: 'now',
        updatedAt: 'now'
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
