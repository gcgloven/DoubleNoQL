// App2 is experimental and joins both App and App1 in an unholy attempt to extract data from the database, and put it into the site.

import React from "react";

import Header from "./Components/Header";
import NavigationLinks from "./Components/NavigationLinks";
import MessageBelowNav from "./Components/MessageBelowNav";

import BookReviewTopTen from "./Components/BookReviewTopTen";
import ReviewData from "./Components/ReviewData";

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
