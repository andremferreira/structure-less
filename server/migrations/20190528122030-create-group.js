'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = withDateNoTz(Sequelize)
    return queryInterface.createTable({
      schema: 'cog',
      schemaDelimiter: '.',
      modelName: 'cog',
      tableName: 'groups'
    }, {
      isn_group: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      isn_father: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            schema: 'cog',
            tableName: 'groups'
          },
          key: 'isn_group'
        },
      },
      isn_son: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      dsc_group: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
        validate: {
          len: [5, 100],
          msg: "Only allow values with length between 5 and 100 characters."
        },
      },
      flg_primal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      int_seq_group: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
      dat_create: {
        allowNull: false,
        type: sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.fn('now'),
      },
      dat_update: {
        allowNull: false,
        type: sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.fn('now'),
      }
    }, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable({
      schema: 'cog',
      schemaDelimiter: '.',
      modelName: 'cog',
      tableName: 'groups'
    }, {
      force: true,
      cascade: true
    });
  }
};