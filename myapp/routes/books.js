"use strict";
const fs = require("fs");
var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books");

mongoose.connect(
  // Switch if you need a localhost.
  // "mongodb://localhost:27017/dbproj",
  "mongodb://ec2-52-221-249-173.ap-southeast-1.compute.amazonaws.com/dbproj",
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

var sorter = [];
var minPrice = 0;
var maxPrice = 1000;
var test = { $gt: minPrice, $lt: maxPrice };
products.post("/", function(req, res) {
  var s = req.body.sortBy;
  var d = req.body.price;
  var slide = req.body.slide;
  console.log(s);
  if (sorter.length != 0) {
    sorter = [];
  }
  if (slide) {
    var slider = slide.split(",");
    minPrice = slider[0];
    maxPrice = slider[1];
    sorter.push("price");
    if (minPrice == 0 && maxPrice == 0) {
      test = 0;
    }
  }
  if (s) {
    sorter.push(String(s));
    minPrice = 0;
    maxPrice = 1000;
  }

  sorter.push(String(s));
  console.log(minPrice, maxPrice);
  console.log("new sort");
  console.log(sorter[0]);
  res.redirect("/books");
});

products.get("/:page", function(req, res, next) {
  var perPage = 9;
  var page = req.params.page || 1;

  // if (req.query.sort == "price") {
  //   var sorter = "-price";
  // } else {
  //   var sorter = "asin";
  // }
  // const sorter1 = req.body.sortBy;
  // console.log("sorter: " + req.body.sortBy);

  Product.find({ price: test })
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
          url: req.originalUrl
        });
        console.log(products);
      });
    });
});

products.get("/", function(req, res, next) {
  var perPage = 9;
  var page = req.params.page || 1;

  // if (req.query.sort == "price") {
  //   var sorter = "-price";
  // } else {
  //   var sorter = "asin";
  // }
  // const sorter1 = req.body.sortBy;
  // console.log("sorter: " + req.body.sortBy);

  Product.find({ price: test })
    .sort(sorter[0])
    .skip(perPage * page - perPage)
    .limit(9)
    .exec(function(err, products) {
      Product.count().exec(function(err, count) {
        if (err) return next(err);
        res.render("books", {
          books: products,
          current: page,
          pages: Math.ceil(count / perPage)
        });
        console.log(products);
      });
    });
});

module.exports = products;
