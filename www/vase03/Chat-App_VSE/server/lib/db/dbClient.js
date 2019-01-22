var mysql      = require('mysql');
var async = require('async');

client = mysql.createConnection({
    host     : '91.240.85.69',
    user     : 'chat_user',
    password : '123456789a'
});

module.exports = client;