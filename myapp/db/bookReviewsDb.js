"user strict";

var mysql = require("mysql");
var mysql_ip = require("./mysql_ip").mysql_ip

//local mysql db connection

var connection = mysql.createConnection({
  host: mysql_ip,
  user: "dbds",
  password: "dbds",
  database: "dbproj"
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
