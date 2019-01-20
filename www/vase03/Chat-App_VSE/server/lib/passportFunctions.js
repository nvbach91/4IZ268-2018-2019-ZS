var LocalStrategy = require('passport-local').Strategy;
var dbFunctions = require('./db/dbFunctions');


function configure(passport, verifyFn) {

    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.
    passport.serializeUser(function(user, done) {
        done(null, user.userID);
    });

    passport.deserializeUser(function(id, done) {
        dbFunctions.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // Use the LocalStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a username and password), and invoke a callback
    //   with a user object.  In the real world, this would query a database;
    //   however, in this example we are using a baked-in set of users.
    var strategy = null
    if (verifyFn)
        strategy = new LocalStrategy( verifyFn )
    else
    {
        strategy = new LocalStrategy(
            function(username, password, done) {
                // asynchronous verification, for effect...
                process.nextTick(function () {

                    // Find the user by username.  If there is no user with the given
                    // username, or the password is not correct, set the user to `false` to
                    // indicate failure and set a flash message.  Otherwise, return the
                    // authenticated `user`.
                    dbFunctions.findByUsername(username, function(err, user) {
                        if (err) { return done(err); }
                        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                        return done(null, user);
                    })
                });
            }
        );
    }

    passport.use(strategy);
}

module.exports = configure