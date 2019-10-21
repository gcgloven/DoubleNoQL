'user strict';
var mysql = require('mysql');
//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'grand',
    password : '5555',
    database : 'mydb'
});

connection.connect(function(err) {
    if (err) throw err;
});

var express = require('express');
var tasks = express.Router();

/* GET home page. */
tasks.get('/tasks', function(req, res, next) {
    connection.query("Select * from tasks", function (err, result) {
        if(err) {
            console.log("error: ", err);
            res.send(err);
        }
        else{
          console.log('tasks : ', result);
          res.render('tasks', {title: 'List of all tasks', tasks: result});
        }
    });
});

module.exports = tasks;