"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      
    */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@mail.com",
          password:
            "$2a$10$VtkAs.llYEvn7qUcpGCmOO8quTs3DY1ObAiTdHnQkdWjTEgTBbPjy",
          username: "admin",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
