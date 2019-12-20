"use strict";
const fs = require("fs");
var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books"),
  Log = require("./../models/logModel"),
  Log = mongoose.model("Logs");

var mongo_ip = require("./mongo_ip").mongo_ip;

mongoose.connect(
  // Switch if you need a localhost.
  // "mongodb://localhost:27017/dbproj",

  "mongodb://" + mongo_ip + "/dbproj",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

var express = require("express");
var products = express.Router();
var bodyParser = require("body-parser");
products.use(bodyParser.json());
products.use(bodyParser.urlencoded({ extended: true }));

// for sorting purposes
var sorter = [];
var minPrice = 0;
var maxPrice = 1000;
var finder = {};
products.post("/", function(req, res) {
  var s = req.body.sortBy;
  var d = req.body.price;
  var slide = req.body.slide;

  // if there's already a sort in place, remove it
  if (sorter.length != 0) {
    sorter = [];
  }

  //if slider was used
  if (slide) {
    var slider = slide.split(",");
    minPrice = slider[0];
    maxPrice = slider[1];
    sorter.push("price");

    //retrieve price from slider and use it to find items within that price range
    if (minPrice == 0 && maxPrice == 0) {
      finder = { price: 0 };
    } else {
      finder = { price: { $gt: minPrice, $lt: maxPrice } };
    }
  }

  // if dropdown menu was used
  if (s) {
    sorter.push(String(s));
    finder = {};
  }
  res.redirect("/books");
});

products.get("/:page", function(req, res, next) {
  try {
    //initialize newLog for successful requests
    var newLog = new Log({
      //asin: asin,
      request: "View Books",
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

    Product.find(finder)
      .sort(sorter[0])
      .skip(perPage * page - perPage)
      .limit(9)
      .exec(function(err, products) {
        Product.count().exec(function(err, count) {
          if (err) return next(err);
          console.log(count);
          res.render("books", {
            books: products,
            current: page,
            pages: Math.ceil(count / perPage),
            query: req.query,
            url: req.originalUrl,

            log_status: newLog.status,
            log_req: newLog.request,
            log_date: newLog.date
          });
          console.log(products);
        });
      });

    console.log(products);
  } catch (err) {
    console.log("error: ", err);
    res.statusCode(400).send("Bad request");

    //initialize newLog for failed requests
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

products.get("/", function(req, res, next) {
  try {
    var newLog = new Log({
      //asin: asin,
      request: "View Books",
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

    Product.find(finder)
      .sort(sorter[0])
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
            log_date: newLog.date
          });
          console.log(products);
          console.log("count: ", count);
        });
      });
  } catch (err) {
    console.log("error: ", err);
    res.send(err);

    //initialize newLog
    var newLog = new Log({
      //asin: asin,
      request: "View Books",
      date: new Date() + "",
      status: "500 Server Error"
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

module.exports = products;
