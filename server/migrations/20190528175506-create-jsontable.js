'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'cog',
      schemaDelimiter: '.',
      tableName: 'jsontables'
    }, {
      isn_jsontable: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isn_group: {
        type: Sequelize.INTEGER,
        allowNull: false,
        schema: 'cog',
        references: {
          model: {
            schema: 'cog',
            tableName: 'groups'
          },
          key: 'isn_group'
        },
      },
      flg_control: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      jsn_obj: {
        type: Sequelize.JSON,
        allowNull: false
      },
      dat_created: {
        type: Sequelize.DATE,
        allowNull: false,
        type: sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.fn('now')

      },
      dat_updated: {
        type: Sequelize.DATE,
        allowNull: false,
        type: sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.fn('now')
      },
    }, 
    // {
    //   uniqueKeys: {
    //     customIndex: {
    //       singleField: false,
    //       fields: ['isn_group', '((jsn_obj-->\'id\')::INT)', 'flg_control'],
    //       references: {
    //         model: {
    //           schema: 'cog',
    //           tableName: 'jsontable'
    //         },
    //         name: 'uk_group_jsn_obj',
    //       },
    //     },
    //   }
    // }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable({
      schema: 'cog',
      schemaDelimiter: '.',
      tableName: 'jsontables'
    });
  }
};