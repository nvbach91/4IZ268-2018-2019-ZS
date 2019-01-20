var session = require('express-session');
var sessionMiddleware = session({
    name: 'jsessionid',
    secret: 'secret',
    saveUninitialized: true,
    resave: true
});

module.exports.sessionMiddleware = sessionMiddleware;