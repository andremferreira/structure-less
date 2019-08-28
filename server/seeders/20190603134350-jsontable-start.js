'use strict';
module.exports = {
  up: (QueryInterface, Sequelize) => {
    return QueryInterface.bulkInsert({
      schema: 'cog',
      schemaDelimiter: '.',
      tableName: 'jsontables'
    }, [{
      isn_group: 1,
      jsn_obj: JSON.stringify({ id: 1, nome:'ANDRE MENDES FERREIRA', email:'andre.mf@isgh.org.br', celular:'999713911', ddd:'85', ddi:'55', perfil:'ADM' })
    }], {})
    .then((success) => console.log("Initial populate of jsontable done!"))
    .catch((error) => console.log(`Error code: ${error.original.code} \nDetail: ${error.original.detail}.`));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({
      schema: 'cog',
      schemaDelimiter: '.',
      tableName: 'jsontables'
    }, null, {});
  },
}