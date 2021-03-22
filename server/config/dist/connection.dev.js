"use strict";

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "secret",
  user: "secret",
  password: "secret",
  database: "secret",
  port: 19132
});
module.exports = {
  con: con
};