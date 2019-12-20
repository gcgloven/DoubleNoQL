"use strict";

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

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

var express = require("express");
var search = express.Router();
//var bodyParser = require('body-parser');
search.get("/", function(req, res) {
  res.render("index");
  console.log("ACCESING Default KEY");
  console.log(req.body.search_name);
  console.log(req.body.submit_name);
});

search.post("/", function(req, res, next) {
  try {
    var newLog = new Log({
      //asin: asin,
      request: "Search Books",
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
    var perPage = 9;
    var page = req.params.page || 1;
    console.log("ACCESING SEARCH KEY");

    var search_key = req.body.index_search;
    console.log("SEARCH KEY", search_key);
    console.log(Product.find({ $text: { $search: search_key } }));
    Product.find({ $text: { $search: search_key } })
      .skip(perPage * page - perPage)
      .limit(9)
      .exec(function(err, products) {
        Product.count().exec(function(err, count) {
          if (err) return next(err);
          res.render("books", {
            books: products,
            current: page,
            pages: Math.ceil(count / perPage),
            log_status: newLog.status,
            log_req: newLog.request,
            log_date: newLog.date,
            log_saved: "Log saved"
          });

          console.log(products);
        });
      });
  } catch (err) {
    console.log("error: ", err);
    res.statusCode(400).send("Bad request");

    //initialize newLog
    var newLog = new Log({
      //asin: asin,
      request: "View Books",
      date: new Date() + "",
      status: res.statusCode
    });

    //post log information into mongodb database
    newLog.save(function(err) {
      //save done
      if (err) {
        console.log(err);
        newLog.status = err;
        process.exit();
      }
      console.log("Log Saved");
      console.log(newLog);
    });
    throw err;
  }
});

/*search.post('/search', function(req, res, next) {
    var perPage = 9
    var page = req.params.page || 1
    console.log("ACCESING SEARCH KEY"
    )

    var search_key = req.body.search_name
    console.log("SEARCH KEY",search_key)
    console.log(Product.find({ $text: { $search: search_key } }))
    
});*/

search.get("/search", function(req, res) {
  res.render("search");
  console.log("ACCESING Default KEY");
  console.log(req.body.search_name);
  console.log(req.body.submit_name);
});

module.exports = search;
