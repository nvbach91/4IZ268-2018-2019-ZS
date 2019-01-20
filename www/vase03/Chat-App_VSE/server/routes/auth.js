module.exports=function(app, passport) {

    var express = require('express');
    var router = express.Router();
    require('../lib/passportFunctions');

    router.get('/profile', ensureAuthenticated, function(req, res){
        res.render('profile', { user: req.user });
    });

    router.post('/login',
        passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
        function(req, res) {
            res.redirect('/');
        });

    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/');
    }

    return router;

};
