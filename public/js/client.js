window.onload = function () {

    var socket = io();

    var $usersList = $('#users');
    var $messagesList = $('#messages');

    let newMessageEvent = 'new message';
    let messageToClientsEvent = 'new message to clients';
    let newUserEvent = 'new user';
    let connectionEvent = 'connect';
    let disconnectEvent = 'disconnect';
    let identifyEvent = 'identify';
    let rosterEvent = 'roster';

    function printMessage(text) {
        console.log("appending new li");
        $messagesList.append($('<li>').text(text));
        window.scrollTo(0, document.body.scrollHeight);
    }

    function setName() {
        var name = String($('#nickname').val() || "Anonymous");
        console.log("new name is " + name)
        socket.emit(identifyEvent, name)
    }

    function printUsers(users) {
        console.log(document.getElementById("users"));
        document.getElementById("users").innerHTML = "";

        users.forEach(function (data) {
            console.log("appending new user li");
            $usersList.append($('<li>').text(data));
        })
    }

    $('form').submit(function () {
        var messageText = $('#message').val().trim();
        if (messageText === ' ') {
            messageText = '';
        }
        console.log("message input value: " + messageText);
        if (messageText !== '') {
            socket.emit(newMessageEvent, messageText);
        }
        $('#message').val('');
        return false;
    });

    $('#nickname').on('input', function () {
        setName();
    });

    socket.on('connect', setName);

    socket.on(rosterEvent, function (names) {
        printUsers(names);
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