"use strict";
var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books");

mongoose.connect("mongodb://localhost/dbproj", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

var express = require("express");
var products = express.Router();

products.get('/books/:page', function(req, res, next) {
  var perPage = 9
  var page = req.params.page || 1

  Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(9)
      .exec(function(err, products) {
          Product.count().exec(function(err, count) {
              if (err) return next(err)
              res.render('books', {
                  books: products,
                  current: page,
                  pages: Math.ceil(count/perPage)
              });
              console.log(products);
          });
      });
});

products.get('/books', function(req, res, next) {
  var perPage = 9
  var page = req.params.page || 1

  Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(9)
      .exec(function(err, products) {
          Product.count().exec(function(err, count) {
              if (err) return next(err)
              res.render('books', {
                  books: products,
                  current: page,
                  pages: Math.ceil(count/perPage)
              });
              console.log(products);
          });
      });
});

module.exports = products;
