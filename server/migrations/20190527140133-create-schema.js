'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createSchema('migrate');
  },
  up: (queryInterface, Sequelize) => {
    return queryInterface.createSchema('cog');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropSchema('migrate');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropSchema('cog');
  }
};
