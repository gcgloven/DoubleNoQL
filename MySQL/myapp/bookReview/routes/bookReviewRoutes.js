'use strict';
module.exports = function(app) {
  var bookReview = require('../controller/bookReviewController');

  // todoList Routes
  app.route('/books')
    .get(bookReview.list_five_tasks)
    };