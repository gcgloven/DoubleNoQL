"use strict";

var mongo_ip = require("./mongo_ip").mongo_ip;

var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books"),
  Log = require("./../models/logModel"),
  Log = mongoose.model("Logs");
mongoose.connect("mongodb://" + mongo_ip + "/dbproj", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connect("mongodb://" + mongo_ip + "/dbproj", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

var express = require("express");
var router = express.Router();
//var bodyParser = require('body-parser');
router.post("/", function(req, res, next) {
  //res.render('addbook');
  console.log("Load_MY_DATA");
  //const { new_asin_id, new_title, new_price, photo } = req.body
  console.log(req.body.new_asin_id);
  console.log(req.body.new_title);
  console.log(req.body.new_price);
  console.log(req.body.photo);

  var newBook = new Product({
    asin: req.body.new_asin_id,
    brand: req.body.new_brand,
    categories: req.body.new_categories,
    description: req.body.new_description,
    imUrl: req.body.photo,
    price: req.body.new_price,
    title: req.body.new_title
  });
  console.log("Get New Book data");
  newBook.save(function(err) {
    //save done
    if (err) {
      console.log(err);
      //post log information into mongodb database
      var newLog = new Log({
        asin: req.body.new_asin_id,
        request: "Add Book",
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
      });
    } else {
      console.log("Book Added");
      //post log information into mongodb database
      var newLog = new Log({
        asin: req.body.new_asin_id,
        request: "Add Book",
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
      });
    }
  });
  res.redirect("back");
});
/*
router.post('/', function(req, res, next) {
    var perPage = 9
    var page = req.params.page || 1
    console.log("ACCESING SEARCH KEY"
    )

    var search_key = req.body.search_name
    console.log("SEARCH KEY",search_key)
    console.log(Product.find({ $text: { $search: search_key } }))
    Product
        .find({ $text: { $search: search_key } })
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
*/

router.get("/", function(req, res) {
  var newLog = new Log({
    //asin: asin,
    request: "Add Book Page",
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
  res.render("addbook", {
    log_req: newLog.request,
    log_date: newLog.date,
    log_status: newLog.status
  });
  console.log("ACCESSING add book page");
});

module.exports = router;
