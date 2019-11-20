"user strict";
var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books"),
  Log = require("./../models/logModel"),
  Log = mongoose.model("Logs");
mongoose.connect(
  "mongodb://ec2-52-221-249-173.ap-southeast-1.compute.amazonaws.com/dbproj",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

function getData(q) {
  var query = Product.find(q, " -_id", function(err) {
    if (err) throw err;
  });
  return query;
}

var connection = require("./../db/bookReviewsDb");

var express = require("express");
var reviews = express.Router();

/* GET home page. */
reviews.get("/reviews", function(req, res, next) {
  connection.query("Select * from reviews limit 10", function(err, result) {
    if (err) {
      console.log("error: ", err);
      res.send(err);

      //post log information into mongodb database
      var newLog = new Log({
        asin: asin,
        request: "Book Review",
        date: new Date() + "",
        status: "fail"
      });
      newLog.save(function(err) {
        //save done
        if (err) {
          console.log(err);
          status: err;
          process.exit();
        }
        console.log("Log Saved");
      });
    } else {
      console.log("reviews : ", result);
      res.render("reviews", {
        title: "List of all book reviews",
        reviews: result
      });

      //post log information into mongodb database
      var newLog = new Log({
        asin: asin,
        request: "Book Review",
        date: new Date() + "",
        status: "success"
      });
      newLog.save(function(err) {
        //save done
        if (err) {
          console.log(err);
          status: err;
          process.exit();
        }
        console.log("Log Saved");
      });
    }
  });

  //post log information into mongodb database
  var newLog = new Log({
    asin: "Null",
    request: "Book Review",
    date: new Date() + ""
  });
  newLog.save(function(err) {
    //save done
    if (err) {
      console.log(err);
      status: err;
      process.exit();
    }
    console.log("Log Saved");
  });
});

reviews.get("/reviews/:asin", function(req, res, next) {
  var asin = req.params.asin;
  var q = "Select * from reviews where asin = '" + asin + "'";

  connection.query(q, async function(err, result) {
    if (err) {
      console.log("error: ", err);
      res.send(err);

      //post log information into mongodb database
      var newLog = new Log({
        asin: asin,
        request: "Book Review",
        date: new Date() + "",
        status: "fail"
      });
      newLog.save(function(err) {
        //save done
        if (err) {
          console.log(err);
          status: err;
          process.exit();
        }
        console.log("Log Saved");
      });
    } else {
      console.log("reviews : ", result);
      let mongoResult = await getData({ asin: asin });
      let arrValues = Object.values(mongoResult);
      console.log("result: " + arrValues[0]);
      let related = await getData({
        asin: arrValues[0].related.also_bought
      });
      let relValues = Object.values(related);

      res.render("reviews", {
        mongo: arrValues[0],
        reviews: result,
        rel: relValues
      });

      //post log information into mongodb database
      var newLog = new Log({
        asin: asin,
        request: "Book Review",
        date: new Date() + "",
        status: "success"
      });
      newLog.save(function(err) {
        //save done
        if (err) {
          console.log(err);
          status: err;
          process.exit();
        }
        console.log("Log Saved");
      });
    }
  });
});

module.exports = reviews;
