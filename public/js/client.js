window.onload = function () {

    var socket = io();

    let newMessageEvent = 'new message';
    let messageToClientsEvent = 'new message to clients';
    let newUserEvent = 'new user';
    let connectionEvent = 'connect';
    let disconnectEvent = 'disconnect';

    function printMessage(text) {
        console.log("appending new li");
        $('#messages').append($('<li>').text(text));
        window.scrollTo(0, document.body.scrollHeight);
    }

    $('form').submit(function () {
        var messageText = $('#m').val().trim();
        if (messageText === ' '){
            messageText = '';
        }
        console.log("message input value: " + messageText);
        if (messageText !== '') {
            socket.emit(newMessageEvent, messageText);
        }
        $('#m').val('');
        return false;
    });

    socket.on(newUserEvent, function (name) {
        printMessage('new user connected: ' + name);
    });

    socket.on(messageToClientsEvent, function (name, msg) {
        printMessage(name + ': ' + msg);
    });

    socket.on(disconnectEvent, function (name) {
        printMessage('user disconnected: ' + name);
    })
};