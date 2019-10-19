var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Product = require('./restapi/models/productModel'),
  // Book = require('./restapi/models/bookModel'),
  bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/onlinestore',  { useMongoClient: true });

// mongoose.connect('mongodb://localhost/metadata',  { useMongoClient: true });
// mongoose.connect('mongodb://localhost/onlinestore');
//
// mongoose.connection.once('open',function(){
//   console.log('Connect Successfully');
// }).on('error',function(error){
//   console.log('Connection error: ', error);
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./restapi/routes/productRoutes');
// var bookroutes = require('./restapi/routes/bookRoutes');
// bookroutes(app);
routes(app);
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port);
console.log('Online Store -  RESTful web services with Nodejs started on: ' + port);
