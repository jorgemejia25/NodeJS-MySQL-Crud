"use strict";

var _require = require("yargs"),
    alias = _require.alias;

var argv = require("yargs").command("crear", "Crea un elemento por hacer", {
  user: {
    demand: true,
    alias: "u",
    desc: "Describe el usuario"
  },
  mail: {
    demand: true,
    alias: "m",
    desc: "Describe el correo"
  }
}).command("leer", "Lee los elementos por hacer", {
  page: {
    demand: false,
    alias: "p",
    desc: "Determina la página para mostrar"
  }
}).command("actualizar", "Actualiza un elemento por hacer", {
  id: {
    demand: true,
    alias: "id",
    desc: "ID a actualizar"
  },
  user: {
    demand: false,
    alias: "u",
    desc: "Describe el usuario"
  },
  mail: {
    demand: false,
    alias: "m",
    desc: "Describe el correo"
  }
}).command("borrar", "Borra un elemento por hacer", {
  id: {
    demand: true,
    alias: "id",
    desc: "ID a actualizar"
  }
}).help().argv;

module.exports = {
  argv: argv
};