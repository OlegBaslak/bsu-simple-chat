'use strict';

// Dependencies
var path = require('path');
var config = require('./app/config');
var express = require('express');
var app = express();

// App components
var server = require('./app/socket')(app);

var port = process.env.PORT || config.port;
var ip = process.env.IP || "0.0.0.0";

app.use(express.static(path.join(__dirname, '/public')));
app.use("/public", express.static(path.join(__dirname, '/public')));

server.listen(port, ip, function () {
    var addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});