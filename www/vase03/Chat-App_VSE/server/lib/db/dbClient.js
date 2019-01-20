var mysql      = require('mysql');
var async = require('async');

client = mysql.createConnection({
    host     : 'localhost',
    user     : 'chat',
    password : '123456789a'
});

module.exports = client;