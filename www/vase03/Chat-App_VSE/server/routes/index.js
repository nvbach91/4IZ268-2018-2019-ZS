var express = require('express');
var router = express.Router();
var dbFunctions = require('../lib/db/dbFunctions');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { user: (typeof(req.user) == 'undefined' ? false : req.user), message: req.flash('error') });
});

router.get('/getSelfDetails', function(req,res,next) {
    dbFunctions.getSelfDetails(req.user.userID, function(err, rows){
        if (err)  { return next(err); }
        if (!rows) {
            return res.status(401).send({"errorMessage": 'Self data not available'});
        }
        return res.send(rows);
    });
});

router.get('/getOtherUserDetails', function(req,res,next) {
    dbFunctions.getOtherUserDetails(req.user.userID, function(err, rows){
        if (err)  { return next(err); }
        if (!rows) {
            return res.status(401).send({"errorMessage": 'User data not available'});
        }
        return res.send(rows);
    });
});

router.get('/getMyMessages', function(req,res,next) {
    dbFunctions.getMyMessages(req.user.userID, function(err, rows){
        if (err)  { return next(err); }
        if (!rows) {
            return res.status(401).send({"errorMessage": 'Message data not available'});
        }
        return res.send(rows);
    });
});

module.exports = router;