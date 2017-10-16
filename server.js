var path = require('path'),
    config = require('./config'),
    async = require('async'),
    express = require('express'),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '/public')));
app.use("/public", express.static(path.join(__dirname, '/public')));

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(process.env.PORT || config.get('port'), process.env.IP || "0.0.0.0", function () {
    var addr = http.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});