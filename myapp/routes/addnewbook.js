"use strict";
var mongoose = require("mongoose"),
  Product = require("./../models/bookModel"),
  Product = mongoose.model("Books"),
  Log = require("./../models/logModel"),
  Log = mongoose.model("Logs");
  mongoose.connect("mongodb://ec2-52-221-249-173.ap-southeast-1.compute.amazonaws.com/dbproj", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connect("mongodb://ec2-52-221-249-173.ap-southeast-1.compute.amazonaws.com/dbproj", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on("error", function(error) {
  console.log("Connection error: ", error);
});

var express = require("express");
var router = express.Router();
//var bodyParser = require('body-parser');
router.post('/addbook', function(req, res,next){
    //res.render('addbook');
    console.log("Load_MY_DATA");
    //const { new_asin_id, new_title, new_price, photo } = req.body
    console.log( req.body.new_asin_id);
    console.log( req.body.new_title);
    console.log( req.body.new_price);
    console.log( req.body.photo);
    
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
      newBook.save(function (err) {
          //save done
          if (err) {
              console.log(err);
             //post log information into mongodb database
            var newLog = new Log({
              asin: req.body.new_asin_id,
              request: 'Add Book',
              date: new Date() + "",
              status: 'fail'
            });
            newLog.save(function (err) {
              //save done
              if (err) {
                  console.log(err);
                  status: err
                  process.exit();
              }
              console.log('Log Saved')
          });

          } else {
          console.log('Book Added')
          //post log information into mongodb database
            var newLog = new Log({
              asin: req.body.new_asin_id,
              request: 'Add Book',
              date: new Date() + "",
              status: 'success'
             });
            newLog.save(function (err) {
              //save done
              if (err) {
                  console.log(err);
                  status: err
                  process.exit();
              }
              console.log('Log Saved')
          });
        }});
      });
/*
router.post('/addbook', function(req, res, next) {
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


router.get('/addbook', function(req, res){
    res.render('addbook');
    console.log("ACCESSING add book page");
  });

module.exports = router;
 