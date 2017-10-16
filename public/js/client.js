window.onload = function () {

  var socket = io();
  
  let newMessageEvent = 'new message';

  $('form').submit(function () {
    socket.emit(newMessageEvent, $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on(newMessageEvent, function (msg) {
    console.log("appending new li");
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
};