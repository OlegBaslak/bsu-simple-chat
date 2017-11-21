'use strict';

var config = require('../config');

/**
 * Encapsulates all events supported by socket for listening and emiting
 * @param {SocketIO.Server} io
 */
var ioEvents = function (io) {

    let newMessageEvent = 'new message';
    let messageToClientsEvent = 'new message to clients';
    let newUserEvent = 'new user';
    let connectionEvent = 'connect';
    let disconnectEvent = 'disconnect';
    let identifyEvent = 'identify';

    io.on(connectionEvent, function (socket) {
        var ID = "U" + (socket.id).toString().substr(0, 5);
        io.emit(newUserEvent, ID)
        console.log('user ' + ID + ' connected');

        socket.on(newMessageEvent, function (msg) {
            console.log("new message from " + ID + ': ' + msg);
            io.emit(messageToClientsEvent, ID, msg);
        });

        socket.on(disconnectEvent, function () {
            console.log('user disconnected');
            io.emit(disconnectEvent, ID)
        });
    });
};

/**
 * Initializes Socket.io
 * @param {Express} app Express server that works with socket
 */
var init = function (app) {
    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    ioEvents(io);

    return server;
};

module.exports = init;