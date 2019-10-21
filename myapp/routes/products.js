'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
  product_name: { type: String, Required:  'Product name cannot be left blank.' },
  price:    { type: String,     Required:  'Product price cannot be left blank.'},
  category: { type: String ,    Required:  'Product category cannot be left blank'}
});
var Product = mongoose.model('Log', productSchema, 'log');
mongoose.connect('mongodb://localhost/logs', {useUnifiedTopology: true, useNewUrlParser: true } )

var express = require('express');
var products = express.Router();

/* GET home page. */
products.get('/products', function(req, res, next) {
    Product.find({}, function(err, result) {
        if (err){
            console.log("error: ", err);
            res.send(err);
        }
        else {
            console.log('tasks : ', result);
            res.render('products', {title: 'List of all products', products: result});
        }
    });
});

module.exports = products;