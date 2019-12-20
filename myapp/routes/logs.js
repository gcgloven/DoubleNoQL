"user strict";

var mongo_ip = require("./mongo_ip").mongo_ip;

var mongoose = require("mongoose"),
  Log = require("./../models/logModel"),
  Log = mongoose.model("Logs");
mongoose.connect("mongodb://" + mongo_ip + "/dbproj", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var params = null;
mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

var express = require("express");
var logs = express.Router();

logs.get("/", function(req, res, next) {
  try {
    var newLog = new Log({
      //asin: asin,
      request: "View Logs",
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
    Log.find()
      .limit()
      .exec(function(err, all_logs) {
        if (err) return next(err);
        res.render("logs", {
          log_result: all_logs,
          log_req: newLog.request,
          log_status: newLog.status,
          log_date: newLog.date
        });
      });
  } catch (err) {
    res.statusCode(400).send("Bad request");
    throw err;
  }
});
module.exports = logs;
