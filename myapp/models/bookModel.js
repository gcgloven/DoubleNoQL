"use strict";
var mongoose2 = require("mongoose");
var Schema = mongoose2.Schema;
var bookSchema = new Schema({
  asin: { type: String, Required: "Product name cannot be left blank." },
  brand: { type: String, Required: "Product name cannot be left blank." },
  categories: { type: Array, Required: "Product name cannot be left blank." },
  description: { type: String, Required: "Product name cannot be left blank." },
  imUrl: { type: String, Required: "Product name cannot be left blank." },
  price: { type: String, Required: "Product name cannot be left blank." },
  related: { type: Object, Required: "Product name cannot be left blank." },
  salesRank: { type: Object },
  title: { type: String, Required: "Product name cannot be left blank." }
});

module.exports = mongoose2.model("Books", bookSchema, "products");
