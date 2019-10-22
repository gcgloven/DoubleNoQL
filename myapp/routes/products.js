"use strict";
var mongoose = require("mongoose"),
  mongoose = mongoose.createConnection("mongodb://localhost/dbproj", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }),
  Product = require("./../models/productModel"),
  Product = mongoose.model("products");

// mongoose.connection.on('error',function(error){
//     console.log('Connection error: ', error);
//   });

var express = require("express");
var products = express.Router();

/* GET home page. */
products.get("/products", function(req, res, next) {
  Product.find({}, function(err, result) {
    if (err) {
      console.log("error: ", err);
      res.send(err);
    } else {
      console.log("books : ", result);
      res.render("products", { title: "List of all logs", logs: result });
    }
  });
});

module.exports = products;
