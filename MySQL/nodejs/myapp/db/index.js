var express = require("express");
var mysql = require("mysql");
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "02031998",
  database: "dbproj"
});

app.set("view engine", "pug");

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT rid from reviewtest", function(err, result) {
    if (err) throw err;
    console.log(result);
  });
});
