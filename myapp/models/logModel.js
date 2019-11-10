"use strict";
var mongoose2 = require("mongoose");
var Schema = mongoose2.Schema;
var bookSchema = new Schema({
  asin: {type: String},
  request: { type: String, Required: "Product name cannot be left blank." },
  date: { type: Date},
  status: {type: String}

});

module.exports = mongoose2.model("Logs", bookSchema, "log");
