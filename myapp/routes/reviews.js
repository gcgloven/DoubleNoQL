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

var book = "";
var params = null;
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
reviews.get("/", function(req, res, next) {
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

reviews.get("/:asin", function(req, res, next) {
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
      var rating = 0;
      for (i = 0; i < result.length; i++) {
        rating += result[i].overall;
      }
      console.log("RATING: " + Math.round(rating / result.length));
      let mongoResult = await getData({ asin: asin });
      let arrValues = Object.values(mongoResult);
      console.log("result: " + arrValues[0]);
      let related = await getData({
        asin: arrValues[0].related.also_bought
      });
      let relValues = Object.values(related);
      params = {
        mongo: arrValues[0],
        reviews: result,
        rating_stars: Math.round(rating / result.length),
        rating: rating / result.length,
        rel: relValues,
        asin: asin
      };
      res.render("reviews", params);

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
reviews.post("/:asin", function(req, res) {
  console.log("i got a request", req.body);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  console.log(date);
  var unix = Math.round(new Date().getTime() / 1000);
  //body=JSON.parse(JSON.stringify(res.body));
  console.log(req.body.rating);
  var q = `insert into reviews(asin,helpful,overall,review_text,review_date,reviewer_id,reviewer_name,summary,unix_review_time) values(\'${req.body.bookasin}\',\'[0, 0]\',${req.body.rating},\'${req.body.review}\',\'${date}\',\'${req.body.userID}\',\'${req.body.username}\',\'${req.body.summary}\',${unix})`;
  console.log(q);
  connection.query(q, function(err, result) {
    if (err) {
      console.log("error: ", err);
      res.send(err);
    } else {
      asin = req.body.asin;
      res.redirect("back");
    }
  });
});
module.exports = reviews;
