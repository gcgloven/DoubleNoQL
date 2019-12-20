var express = require("express");
var router = express.Router();

var mongo_ip = require("./mongo_ip").mongo_ip;

var mongoose = require("mongoose"),
  Log = require("./../models/logModel"),
  Log = mongoose.model("Logs");

mongoose.connect("mongodb://" + mongo_ip + "/dbproj", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

/* GET home page. */
router.get("/", function(req, res, next) {
  try {
    var newLog = new Log({
      request: "Access Homepage",
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

    res.render("index", {
      title: "Express",
      log_req: newLog.request,
      log_date: newLog.date,
      log_status: newLog.status
    });
  } catch (err) {
    res.statusCode(400).send("Bad request");
    var newLog = new Log({
      request: "Access Homepage",
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
    throw err;
  }
});

module.exports = router;
