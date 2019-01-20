var mysql      = require('mysql');
var async = require('async');
var client = require('./dbClient');

var db_name = ''

function initializeComprehensively(doneCB){
    async.series([
        // see http://stackoverflow.com/questions/14087924/cannot-enqueue-handshake-after-invoking-quit
        // function connect(callback) {
        //     client.connect(callback);
        // },
        function clear(callback) {
            client.query('DROP SCHEMA IF EXISTS `'+db_name+'`', callback);
        },
        function create_schema(callback) {
            client.query('CREATE SCHEMA IF NOT EXISTS `'+db_name+'` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci', callback);
        },
        function use_db(callback) {
            client.query('USE `'+db_name+'`', callback);
        },
        function drop_table_users(callback) {
            client.query('DROP TABLE IF EXISTS `'+db_name+'`.`users`', callback);
        },
        function create_users(callback) {
            client.query(
                    ' CREATE TABLE IF NOT EXISTS `'+db_name+'`.`users` (' +
                    '   `userID` INT UNSIGNED NOT NULL,' +
                    '   `username` VARCHAR(45) NULL,' +
                    '   `password` VARCHAR(45) NULL,' +
                    '   `socketID` VARCHAR(45) NULL,' +
                    '   `last_login_date` DATETIME NULL,' +
                    '   PRIMARY KEY (`userID`))' +
                    ' ENGINE = InnoDB'
                , callback);
        },
        function drop_table_messages(callback) {
            client.query(' DROP TABLE IF EXISTS `'+db_name+'`.`messages` ', callback);
        },
        function create_messages(callback) {
            client.query(
                    ' CREATE TABLE IF NOT EXISTS `'+db_name+'`.`messages` (' +
                    '   `messagesID` INT NOT NULL AUTO_INCREMENT,' +
                    '   `from` INT UNSIGNED NOT NULL,' +
                    '   `to` INT UNSIGNED NOT NULL,' +
                    '   `content` VARCHAR(255) NULL,' +
                    '   `delivery_status` VARCHAR(45) NULL DEFAULT \'none\',' +
                    '   `date` DATETIME NULL,' +
                    '   PRIMARY KEY (`messagesID`, `to`, `from`),' +
                    '   INDEX `from_userID_idx` (`from` ASC),' +
                    '   INDEX `to_userID_idx` (`to` ASC),' +
                    '   CONSTRAINT `from_userID`' +
                    '     FOREIGN KEY (`from`)' +
                    '     REFERENCES `'+db_name+'`.`users` (`userID`)' +
                    '     ON DELETE NO ACTION' +
                    '     ON UPDATE NO ACTION,' +
                    '   CONSTRAINT `to_userID`' +
                    '     FOREIGN KEY (`to`)' +
                    '     REFERENCES `'+db_name+'`.`users` (`userID`)' +
                    '     ON DELETE NO ACTION' +
                    '     ON UPDATE NO ACTION)' +
                    ' ENGINE = InnoDB'
                , callback);
        }
    ], function (err, results) {
        if (err) {
            $log('Exception initializing database.');
            throw err;
        } else {
            $log('Database initialization complete.');
            if (doneCB) doneCB()
        }
    });
}

function addDefaultData(doneCB) {
    async.series([
        function insert_users(callback) {
            var userData = [
                [1, 'user1', 'secret'],
                [2, 'user2', 'secret'],
                [3, 'user3', 'secret']
            ];
            client.query('INSERT INTO `'+db_name+'`.`users` (`userID`, `username`, `password`) VALUES ?', [userData], callback);
        },
        function insert_messages(callback) {
            var messageData = [
                [1, 1, 2, 'hello from 1 to 2', '', '2015-05-01 12:27:06'],
                [2, 1, 3, 'hello from 1 to 3', '', '2015-05-01 12:27:09'],
                [3, 2, 1, 'hello from 2 to 1', '', '2015-05-01 12:27:07'],
                [4, 2, 3, 'hello from 2 to 3', '', '2015-05-01 12:27:10'],
                [5, 3, 1, 'hello from 3 to 1', '', '2015-05-01 12:27:08'],
                [6, 3, 2, 'hello from 3 to 2', '', '2015-05-01 12:27:11']
            ];
            client.query('INSERT INTO `'+db_name+'`.`messages` (`messagesID`, `from`, `to`, `content`, `delivery_status`, `date`) VALUES ?', [messageData] ,callback);
        }],
        function(err,results) {
            if (err) {
                $log('could not add test data users')
                throw err
            }
            else
            {
                $log('added default test data')
                doneCB()
            }
        }
    )
}

module.exports = function(the_db_name) {
    db_name = the_db_name
    return {
        initializeComprehensively: initializeComprehensively,
        addDataForManualTesting: addDefaultData,
        client: client
    }
}

module.exports.initializeComprehensively = initializeComprehensively;
module.exports.addDataForManualTesting = addDefaultData;
module.exports.client = client;
