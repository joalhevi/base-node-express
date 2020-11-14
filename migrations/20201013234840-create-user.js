'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:{
            tableName:'Roles'
          },
          key:'id'
        }
      },
      resetPasswordToken: {
        type: Sequelize.STRING
      },
      resetPasswordExpires: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};