var socket = io();

$(function() {
  var gameCode = window.location.href.split('/')[-1];
  console.log(gameCode);
  socket.emit('join_room', gameCode, function(game) {
    console.log('Game: ' + game);
  });
});

socket.on('broadcast:join_room', function(data) {
  console.log("Event 'broadcast:join_room' emitted.");
  console.log("---> Data: " + data);
  console.log($('#connected-users'));
  $('#connected-users').append($('<p>').text(data));
});
