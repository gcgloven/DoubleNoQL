var express = require("express");
var router = express.Router();

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dbproj"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
/* test API */
router.get("/", function(req, res, next) {
  //res.send("API is working properly");
  con.query("SELECT * from reviewtest", function(err, result) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
