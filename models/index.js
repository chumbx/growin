"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("growin", "postgres", "passgres", {
  host: process.env.POSTGRESQL_LOCAL_HOST,
  port: 5432,
  timezone: "UTC",
  dialect: 'postgres',
  logging: false,
  // logging: console.log,
  // operatorsAliases: false, // disable aliases
  /*dialectOptions: {
   ssl: true
   },*/
  freezeTableName: true,
  pool: {
    max: 20,
    min: 0,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {
  console.log('Sequelize - Connection has been established successfully.');
}).catch((err) => {
  console.error('Sequelize - Unable to connect to the database:', err);
});

var db = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});
  
// sequelize.sync({ force: true, match: /growin$/ });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
