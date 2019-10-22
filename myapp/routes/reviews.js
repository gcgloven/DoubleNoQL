'user strict';
var connection = require('./../db/bookReviewsDb');

var express = require('express');
var reviews = express.Router();

/* GET home page. */
reviews.get('/reviews', function(req, res, next) {
    connection.query("Select * from reviews limit 10", function (err, result) {
        if(err) {
            console.log("error: ", err);
            res.send(err);
        }
        else{
          console.log('reviews : ', result);
          res.render('reviews', {title: 'List of all book reviews', reviews: result});
        }
    });
});

module.exports = reviews;