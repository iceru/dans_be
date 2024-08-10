"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Positions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.TEXT,
      },
      company: {
        type: Sequelize.STRING,
      },
      company_url: {
        type: Sequelize.TEXT,
      },
      company_logo: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      how_to_apply: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Positions");
  },
};
