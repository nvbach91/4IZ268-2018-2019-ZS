module.exports = function(server, config) {
    var dbFunctions = require('./db/dbFunctions');
    var sessionMiddleware = require('./session').sessionMiddleware;

    var io = require('socket.io').listen(server);

    // Read sessions from within socket.io
    io.use(function(socket, next){ sessionMiddleware(socket.request, {}, next); });

    io.on('connection', function(socket) {

        // update user's socketID against their own record

        /*
            This allows us to test socket.io stuff and workaround the node socket.io client
            problems with cookie persistence.

            It is mildy secure but a better change would be to improve the whole socket.io
            approach to authentification using the socket.io 'authorization' middleware
            for either cookies or tokens
        */
        var userID;
        if (socket.request.session.passport && socket.request.session.passport.user)
            userID = socket.request.session.passport.user;
        else if (config.environment === 'test') {
            userID = parseInt(socket.request._query.user_id)
        }
        else
            throw new Error('Cannot get user ID from session')

        dbFunctions.updateSocketID(userID, socket.id, function(err, rows) {
            if(err) {return console.log('error in updating user socketID', err)}
        });

        // echoing the userID back to the client, mainly for the benefit of the tests
        socket.emit('userID', {'userID':userID})

        // tell everyone else that this user is now online
        socket.broadcast.emit('socketID', {'userID': userID, 'socketID': socket.id});

        socket.on('chat', function(chatmessage, callback) {
            if (chatmessage.targetSocketID != null) {
                // target user is online, send message to target user
                io.to(chatmessage.targetSocketID).emit('chat', chatmessage); // callback not available for server emits !
                // try to store in db with delivery_status = 'seen'
                dbFunctions.insertChatMessage(chatmessage, function (err, rows) {
                    if (err) {return callback(null, {'delivery_status': 'not delivered'});}
                    return callback(null, {'delivery_status': 'seen'});
                });
            } else {
                // target user is offline, try to store message in db with delivery_status = 'delivered'
                dbFunctions.insertChatMessage(chatmessage, function (err, rows) {
                    if (err) {return callback(null, {'delivery_status': 'not delivered'});}
                    return callback(null, {'delivery_status': 'delivered'});
                });
            }
        });
    });

};