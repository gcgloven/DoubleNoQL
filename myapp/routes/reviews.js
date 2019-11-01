"user strict";
var mongoose = require("mongoose"),
  Book = require("./../models/bookModel"),
  Log = require("./../models/logModel"),
  Log = mongoose.model("Logs");
  mongoose.connect("mongodb://ec2-52-221-249-173.ap-southeast-1.compute.amazonaws.com/dbproj", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

function getBookInfo(asin) {
  var book = Book.findOne({ asin: asin }).lean().exec();
  return book;
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
    } else {
      // console.log("reviews : ", result);
      res.render("reviews", {
        title: "List of all book reviews",
        reviews: result
      });
    }
  });

  //post log information into mongodb database
  var newLog = new Log({
      asin: 'Null',
      request: 'Book Review',
      date: new Date() + ""
  });
  newLog.save(function (err) {
      //save done
      if (err) {
          console.log(err);
          status: err
          process.exit();
      }
      console.log('Log Saved')
  });
});

reviews.get("/reviews/:asin", async function(req, res, next) {
  var asin = req.params.asin;
  var q = "Select * from reviews where asin = '" + asin + "'";
  var book = await getBookInfo(asin)
  connection.query(q, function(err, result) {
    if (err) {
      console.log("error: ", err);
      res.send(err);
    } else {
      console.log("reviews : ", result);
      res.render("reviews", {
        title: book.title,
        reviews: result,
        asin: asin
      });
    }
  });

  //post log information into mongodb database
  var newLog = new Log({
      asin: asin,
      request: 'Book Review',
      date: new Date() + ""
  });
  newLog.save(function (err) {
      //save done
      if (err) {
          console.log(err);
          status: err
          process.exit();
      }
      console.log('Log Saved')
  });
});

reviews.post('/reviews/new', function(req, res) {
  console.log('i got a request', req.body)
  res.send('  reviews')
})
module.exports = reviews;
