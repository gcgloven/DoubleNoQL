'use strict';

var BookReview = require('../model/bookReviewModel');

exports.list_five_tasks = function(req, res) {
  BookReview.getFiveBookReview(function(err, review) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', review);
    res.send(review);
  });
};