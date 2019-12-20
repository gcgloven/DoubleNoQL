"user strict";

var mongo_ip = require("./mongo_ip").mongo_ip;

var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books"),
  Log = require("./../models/logModel"),
  Log = mongoose.model("Logs");
mongoose.connect("mongodb://" + mongo_ip + "/dbproj", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

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

reviews.get("/:asin", function(req, res, next) {
  var asin = req.params.asin;
  var q = "Select * from reviews where asin = '" + asin + "'";

  connection.query(q, async function(err, result) {
    try {
      console.log("reviews : ", result);

      var rating = 0;
      for (i = 0; i < result.length; i++) {
        rating += result[i].overall;
      }

      //for retrieving related books from mongo database
      let mongoResult = await getData({ asin: asin });
      let arrValues = Object.values(mongoResult);
      let related = await getData({
        asin: arrValues[0].related.also_bought
      });
      let relValues = Object.values(related);

      if (typeof result !== "undefined") {
        var newLog = new Log({
          //asin: asin,
          request: "Book Review",
          date: new Date() + "",
          status: res.statusCode
        });
        newLog.save(function(err) {
          //save done
          if (err) {
            console.log(err);
            status: err;
            process.exit();
          }
          console.log("Log Saved");
          console.log(newLog.status);
        });
      }
      params = {
        mongo: arrValues[0],
        reviews: result,
        rating_stars: Math.round(rating / result.length),
        rating: rating / result.length,
        rel: relValues,
        asin: asin,
        log_status: newLog.status,
        log_req: newLog.request,
        log_date: newLog.date
      };
      res.render("reviews", params);
    } catch (err) {
      console.log(err);
      res.status(400).send("Bad request");
      var newLog = new Log({
        //asin: asin,
        request: "Book Review",
        date: new Date() + "",
        status: res.statusCode
      });
      newLog.save(function(err) {
        //save done
        if (err) {
          console.log(err);
          status: err;
          process.exit();
        }
        console.log("Log Saved");
        console.log(newLog.status);
      });

      throw err;
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

      var newLog = new Log({
        //asin: asin,
        request: "Add Review",
        date: new Date() + "",
        status: res.statusCode
      });
      newLog.save(function(err) {
        //save done
        if (err) {
          console.log(err);
          status: err;
          process.exit();
        }
        console.log("Log Saved");
        console.log(newLog.status);
      });
      res.redirect("back");
    }
  });
});

module.exports = reviews;
