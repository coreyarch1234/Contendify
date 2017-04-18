var socket = io();

// when veiw loads
// create socket
// emit creategame event (create game on server, send it back to us)
  // in cb emit joinroom event
// server should create game object, we should then display that a user joined

$(function() {
  var code = window.location.href.split('/')[3];
  socket.emit('join_room', code, function(game) {
    console.log('Game: ' + game);
  });

  

});

socket.on('broadcast:join_room', function(data) {
  console.log("Event 'broadcast:join_room' emitted.");
  console.log("---> Data: " + data);
  console.log($('#connected-users'));
  $('#connected-users').append($('<p>').text(data));
});