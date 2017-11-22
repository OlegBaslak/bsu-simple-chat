'use strict';

var config = require('../config');
var async = require('async');

/**
 * Encapsulates all events supported by socket for listening and emiting
 * @param {SocketIO.Server} io
 */
var ioEvents = function (io) {

    var sockets = [];

    let newMessageEvent = 'new message';
    let messageToClientsEvent = 'new message to clients';
    let newUserEvent = 'new user';
    let connectionEvent = 'connect';
    let disconnectEvent = 'disconnect';
    let identifyEvent = 'identify';
    let rosterEvent = 'roster';

    io.on(connectionEvent, function (socket) {
        var ID = "U" + (socket.id).toString().substr(0, 5);
        io.emit(newUserEvent, ID)
        console.log('user ' + ID + ' connected');

        sockets.push(socket.nickname);

        socket.on(newMessageEvent, function (msg) {
            console.log("new message from id " + ID + ' (user: ' + socket.nickname + '): ' + msg);
            var text = String(msg || '');
            io.emit(messageToClientsEvent, socket.nickname, text);
        });


        socket.on(disconnectEvent, function () {
            console.log('user disconnected');
            io.emit(disconnectEvent, ID)
        });

        socket.on(identifyEvent, function (name) {
            socket.nickname = name;
            updateRoster();
        });

        function updateRoster() {
            var connectedUsers = Object.keys(io.sockets.connected).map(function (socketId) {
                return io.sockets.connected[socketId].nickname;
            });
            console.log("connected users:")
            console.log(connectedUsers);

            io.emit(rosterEvent, connectedUsers);
        }
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