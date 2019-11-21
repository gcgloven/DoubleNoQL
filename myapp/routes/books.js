"use strict";
var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books");

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

var express = require("express");
var products = express.Router();
var bodyParser = require("body-parser");
products.use(bodyParser.json());
products.use(bodyParser.urlencoded({ extended: true }));

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

  Product.find({})
    //.sort(sorter1)
    .skip(perPage * page - perPage)
    .limit(9)
    .exec(function(err, products) {
      Product.count().exec(function(err, count) {
        if (err) return next(err);
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

  Product.find({})
    //.sort("-price")
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
