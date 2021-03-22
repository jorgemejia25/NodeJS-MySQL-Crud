var mysql = require("mysql");
var con = mysql.createConnection({
    host: "secret",
    user: "secret",
    password: "secret",
    database: "secret",
    port: 00000,
});

module.exports = {
    con,
};