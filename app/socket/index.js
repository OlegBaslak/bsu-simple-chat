'use strict';

var config = require('../config');

/**
 * Encapsulates all events supported by socket for listening and emiting
 * @param {SocketIO.Server} io 
 */
var ioEvents = function (io) {

    let connectionEvent = config.events.connection;
    let newMessageEvent = config.events.newMessage;

    io.on(connectionEvent, function (socket) {
        console.log('a user connected');

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on(newMessageEvent, function (msg) {
            console.log('message: ' + msg);
            io.emit(newMessageEvent, msg);
        });
    });
}

/**
* Initializes Socket.io
 * @param {Express} app Express server that works with socket
 */
var init = function (app) {
    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    ioEvents(io);

    return server;
}

module.exports = init;