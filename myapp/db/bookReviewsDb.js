"user strict";

var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "dbds@localhost",
  password: "dbds",
  database: "dbproj"
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
