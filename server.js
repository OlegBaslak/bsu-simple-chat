var path = require('path'),
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

http.listen(3000, function () {
    console.log('listening on *:3000');
});

// logger.debug('Server has been started on port ' + port);
//app.use(express.static(__dirname + '/public'));