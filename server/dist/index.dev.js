"use strict";

var mysql = require("mysql");

var connect = require("./config/connection");

var argv = require("../config/yargs").argv;

var colors = require("colors");

var comando = argv._[0];
var user = argv.user;
var mail = argv.mail;
var id = argv.id;

switch (comando) {
  case "crear":
    connect.con.connect(function (err) {
      if (err) throw err;
      console.log("Connectado!".green);
      connect.con.query("INSERT INTO tabla (user, gmail, activo) VALUES ('".concat(user, "', '").concat(mail, "', 1)"), function (err, result) {
        if (err) throw err;
        console.log("Datos ingresados con \xE9xito.\n" + "User: " + "".concat(user, ".\n").green.bold + "Mail: " + "".concat(mail, ".").green.bold);
      });
    });
    break;

  case "leer":
    page = argv.page;
    connect.con.query("SELECT * FROM tabla WHERE Activo=1", function (error, results, fields) {
      if (error) throw error; // if (page == 1) console.log(results.slice(0, 5));
      // else console.log(results.slice(1 * ((page * 5) / 2), 5 * page));

      console.log("-----------------------------------");
      console.log("Mostrando resultados de la p\xE1gina ".concat(page));
      arrayPaginado = [[]];

      for (var i = 0; i < results.length; i++) {
        if (arrayPaginado[arrayPaginado.length - 1][4] == undefined) {
          arrayPaginado[arrayPaginado.length - 1].push(results[i]);
        } else {
          arrayPaginado.push([]);
          arrayPaginado[arrayPaginado.length - 1].push(results[i]);
        }
      }

      if (page == undefined) {
        for (var _i = 0; _i < results.length; _i++) {
          console.log(results[_i].user);
        }
      } else {
        arrayPaginado[page - 1].forEach(function (element) {
          console.log(element.user);
        });
      }

      console.log("-----------------------------------");
    });
    break;

  case "actualizar":
    if (user == undefined && mail == undefined) {
      console.log("Debe especificar el campo a actualizar".red);
    } else if (user == undefined && mail != undefined) {
      connect.con.query("UPDATE tabla SET gmail = '".concat(mail, "' WHERE id = ").concat(id, " "), function (error, results, fields) {
        if (error) throw error;
        console.log("Datos actualizados con exito".green);
      });
    } else if (user != undefined && mail == undefined) {
      connect.con.query("UPDATE tabla SET user = '".concat(user, "' WHERE id = ").concat(id, " "), function (error, results, fields) {
        if (error) throw error;
        console.log("Datos actualizados con exito".green);
      });
    } else {
      connect.con.query("UPDATE tabla SET gmail = '".concat(mail, "', user = '").concat(user, "' WHERE id = ").concat(id, " "), function (error, results, fields) {
        if (error) throw error;
        console.log("Datos actualizados con exito".green);
      });
    }

  case "borrar":
    // let borrado = porHacer.borrar(argv.descripcion);
    // console.log(borrado);
    connect.con.query("UPDATE tabla SET Activo = 0 WHERE id = ".concat(id, " "), function (error, results, fields) {
      if (error) throw error;
      console.log("Datos eliminados con exito".green);
    });
    break;

  default:
    console.log("Comando desconocido");
    break;
}