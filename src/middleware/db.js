const mysql = require("mysql");
require('dotenv').config();

var connection = mysql.createPool({
  host: process.env.COREAPP_DB_HOST,
  user: process.env.COREAPP_DB_USER,
  password: process.env.COREAPP_DB_PASSWORD,
  database: process.env.COREAPP_DB_DATABASE
});

module.exports = connection;