var express = require('express');
var app = express();
var mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'metadata';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  findDocuments(db, function() {
      client.close();
    });
});


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('bookmetadata1');
  // Find some documents
  collection.find({}, { "related.also_bought":1}).limit(10).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
    app.get('/', function (req, res) {
      res.send(docs);
    });
  });
}
//Es6
// mongoose.Promise = global.Promise;
//
// //  connect to mongodb
// mongoose.connect('mongodb://localhost/metadata');
//
// mongoose.connection.once('open',function(){
//   console.log('Connect Successfully');
// }).on('error',function(error){
//   console.log('Connection error: ', error);
// });

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });



//GET ARTICLE
// app.get('mongodb://localhost/metadata/', (req, res) => {
//
//     var id = req.query.id
//     var article = [];
//
//     db.collection('bookmetadata')
//         .find( )
//         .then(result => {
//             article = articles.concat(result);
//         }).then(() => {
//             res.send(article);
//         }).catch(e => {
//             console.error(e);
//         });
//
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
