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
var search = express.Router();

/*Product.ensureIndex("asin", {  
  description: "text"
}, function(err, indexname) {
  assert.equal(null, err);
});
*/

search.get('/search', function(req, res){
  res.render('search');
  console.log("ACCESING Default KEY");
  console.log(req.body.search_name);
  console.log(req.body.submit_name);
});


search.post('/search', function(req, res, next) {
  var perPage = 9
  var page = req.params.page || 1
  console.log("ACCESING SEARCH KEY"
  )
  var search_key = req.body.search_name
  console.log("SEARCH KEY",search_key)
  console.log(Product.find({ $text: { $search: search_key } }))
  Product
      .find({ $text: { $search: search_key } })
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
  //var page = req.params.page || 1
//Product
  //.find( { $text: { $search: search_key } } )
  //.limit(9)
  //.exec(function(err, search) {
      //Product.exec(function(err, count) {
          //if (err) return next(err)
          /*res.render('search', {
              books: search,
              current: page,
              pages: Math.ceil(count/perPage)
          });*/
          //console.log(search);
/*Product
      .find( { $text: { $search: search_key } } )
      .limit(9)
      .exec(function(err, search) {
          Product.exec(function(err, count) {
              if (err) return next(err)
              res.render('search', {
                  books: search,
                  current: page,
                  pages: Math.ceil(count/perPage)
              });
              console.log(search);
          });
      });
});*/



module.exports = search;
