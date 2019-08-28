'use strict';
const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const Group = sequelize.define('Group', {
    isn_group: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    isn_father: {
      type: DataTypes.INTEGER
    },
    isn_son: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    dsc_group: {
      type: DataTypes.STRING(100),
      allowNull: false,
      indexName: 'dscGroupNameUk',
      indicesType: 'UNIQUE'
    },
    flg_primal: {
      type: DataTypes.BOOLEAN,
      DefaultValue: false,
    },
    int_seq_group: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    dat_create: {
      allowNull: false,
      type: seq.DATE_NO_TZ,
      defaultValue: seq.fn('now'),
    },
    dat_update: {
      allowNull: false,
      type: seq.DATE_NO_TZ,
      defaultValue: seq.fn('now'),
    }
  }, {
    underscored: true,
    schema: 'cog',
    timestamps: false
  });
  Group.associate = function (models) {
    Group.hasMany(models.Jsontable, {
      foreignKey: 'isn_group',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Group.schema('cog')
  };
  return Group;
};