"user strict";

var mongo_ip = require("./mongo_ip").mongo_ip

var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books"),
  Log = require("./../models/logModel"),
  Log = mongoose.model("Logs");
mongoose.connect(
  "mongodb://" + mongo_ip + "/dbproj",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

var params = null;
mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

function getLog() {
  var query = Log.find().limit(10);
  return query;
}

var express = require("express");
var logs = express.Router();

logs.get("/", function(req, res, next) {
  Log.find()
    .limit()
    .exec(function(err, all_logs) {
      if (err) return next(err);
      res.render("logs", { log_result: all_logs });
    });
});
module.exports = logs;
