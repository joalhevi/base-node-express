'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Roles', [{
      name: 'Super administrator',
      description :'access total',
      permissions:  JSON.stringify(["*"]),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Roles', [{
      name: 'usuario',
      description :'usuario normal',
      permissions:  JSON.stringify([]),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
