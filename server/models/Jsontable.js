'use strict';
const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const Jsontable = sequelize.define('Jsontable', {
    isn_jsontable: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    isn_group: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          schema: 'cog',
          tableName: 'groups'
        },
        key: 'isn_group'
      },
    },
    flg_control: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    jsn_obj: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    dat_created: {
      type: Sequelize.DATE,
      allowNull: false,
      type: seq.DATE_NO_TZ,
      defaultValue: Sequelize.fn('now')
    },
    dat_updated: {
      type: Sequelize.DATE,
      allowNull: false,
      type: seq.DATE_NO_TZ,
      defaultValue: Sequelize.fn('now')
    },
  }, {
    underscored: true,
    schema: 'cog',
    timestamps: false
  });
  Jsontable.associate = function (models) {
    Jsontable.belongsTo(models.Group, {
      foreignKey: 'isn_group',
      constraints: false,
      through: 'jsontable_assoc_group'
    });
   Jsontable.schema('cog') 
  };
  return Jsontable;
};