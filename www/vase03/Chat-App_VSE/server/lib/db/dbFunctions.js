var client = require('./dbClient');

// for passport.js
function findById(id, fn) {
    var query = 'SELECT * FROM users WHERE users.userID = ?';
    client.query(query, id, function(err, rows) {
        if (err) return fn(err);
        if (!rows.length) {
            return fn(new Error('User ' + id + ' does not exist'));
        }
        return fn(null, rows[0]);
    });
}

// for passport.js
function findByUsername(username, fn) {
    var query = 'SELECT * FROM users WHERE users.username = ?';
    client.query(query, username, function(err, rows) {
        if (err) return fn(err);
        if (rows.length) {
            return fn(null, rows[0]);
        }
        return fn(null, null);
    });
}

function getSelfDetails(id, fn) {
    var query = 'SELECT * FROM users WHERE userID = ?';
    client.query(query, id, function(err, rows) {
        if (err) return fn(err);
        if (rows.length) {
            return fn(null, rows);
        }
        return fn(null, null);
    });
}

function getOtherUserDetails(id, fn) {
    var query = 'SELECT * FROM users WHERE userID != ?';
    client.query(query, id, function(err, rows) {
        if (err) return fn(err);
        if (rows.length) {
            return fn(null, rows);
        }
        return fn(null, null);
    });
}

function getMyMessages(userID, fn) {
    var query = '';
    query = query + ' SELECT `messagesID`, `from`, `to`, `content`, `delivery_status`, DATE_FORMAT(date, "%1:%i:%s %p") AS `date` FROM messages m1 WHERE m1.from = ?';
    query = query + ' UNION';
    query = query + ' SELECT `messagesID`, `from`, `to`, `content`, `delivery_status`, DATE_FORMAT(date, "%1:%i:%s %p") AS `date` FROM messages m2 WHERE m2.to = ?';
    query = query + ' ORDER BY `date`';
    client.query(query, [userID, userID], function(err, rows) {
        if (err) return fn(err);
        if (rows.length) {
            return fn(null, rows);
        }
        return fn(null, null);
    });
}

function updateSocketID(userID, socketID, fn) {
    var query = '';
    query = query + ' UPDATE users';
    query = query + ' SET socketID = ?';
    query = query + ' WHERE userID = ?';
    client.query(query, [socketID, userID], function(err, rows) {
        if (err) return fn(err);
        return fn(null, null);
    });

}

function insertChatMessage(message, fn) {
    var m = message;
    var deliveryStatus = (m.targetSocketID != null) ? 'seen' : 'delivered';
    var query = 'INSERT INTO `messages` (`from`, `to`, `content`, `delivery_status`, `date`) VALUES (?,?,?,?,NOW())';
    client.query(query, [m.from, m.to, m.content, deliveryStatus], function(err, rows) {
        if (err) return fn(err);
        return fn(null, null);
    });
}

process.on('SIGINT', function() {
    client.end(); // end mysql after ^C
    process.exit();
});

module.exports.findById = findById;
module.exports.findByUsername = findByUsername;
module.exports.getSelfDetails = getSelfDetails;
module.exports.getOtherUserDetails = getOtherUserDetails;
module.exports.getMyMessages = getMyMessages;
module.exports.updateSocketID = updateSocketID;
module.exports.insertChatMessage = insertChatMessage;