var express = require("express");
var router = express.Router();

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "grand",
  password: "5555",
  database: "dbds_test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
/* test API */
router.get("/", function(req, res, next) {
  //res.send("API is working properly");
  con.query("select * from reviews limit 5", function(err, result) {
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
