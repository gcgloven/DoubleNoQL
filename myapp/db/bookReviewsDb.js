"user strict";

var mysql = require("mysql");

//local mysql db connection

var connection = mysql.createConnection({
  host: "ec2-54-169-138-245.ap-southeast-1.compute.amazonaws.com",
  user: "dbds",
  password: "dbds",
  database: "dbproj"
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
