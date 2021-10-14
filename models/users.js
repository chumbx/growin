"use strict";
module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define('users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      givenName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      familyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      freezeTableName: true,
      createdAt: 'created',
      updatedAt: false
    });

  return users;
};
