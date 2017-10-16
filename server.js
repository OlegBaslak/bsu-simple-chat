var path = require('path'),
    config = require('./config'),
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

var port = config.get('port');
http.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

// logger.debug('Server has been started on port ' + port);
//app.use(express.static(__dirname + '/public'));