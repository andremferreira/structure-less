'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({
      schema: 'cog',
      schemaDelimiter: '.',
      tableName: 'groups'
    }, [{
      dsc_group: 'USUÁRIOS',
      flg_primal: true
    }], {})
    .then((success) => console.log("Initial populate of groups done!"))
    .catch((error) => console.log("Already populated!"));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({
      schema: 'cog',
      schemaDelimiter: '.',
      tableName: 'groups'
    }, null, {});
  },
}