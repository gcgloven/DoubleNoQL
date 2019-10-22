"use strict";
var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books");

mongoose.connect("mongodb://localhost/book", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

var express = require("express");
var products = express.Router();

/* GET home page. */
products.get("/books", function(req, res, next) {
  Product.find({}, function(err, result) {
    if (err) {
      console.log("error: ", err);
      res.send(err);
    } else {
      console.log("books : ", result);
      res.render("books", { title: "List of all books", books: result });
    }
  }).limit(9);
});

module.exports = products;
