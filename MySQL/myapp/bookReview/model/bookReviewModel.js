'user strict';
var sql = require('./bookReviewDb');

//review object constructor
var BookReview = function(review){
    this.asin = review.asin;
    this.text = review.review_text;
    this.date = new Date();
};

BookReview.getFiveBookReview = function (result) {
        sql.query("select * from reviews limit 5", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('reviews : ', res);  

                 result(null, res);
                }
            });   
};

module.exports= BookReview;