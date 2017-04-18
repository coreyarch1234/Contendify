$(function () {
  $('#createGame').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var jsonData = {};
    jsonData['name'] = data[0].value;
    jsonData['gameCode'] = data[1].value;

    window.location.href = "/games/" + jsonData['gameCode'];

    // pageToShow(jsonData, function(data) {
      // socket.emit('join_room', data, function(game) {
      //   console.log('Game: ' + game);
      //   console.log($('#connected-users'));
      //   $('#connected-users').append($('<p>').text(game.gameCode));
      // });
    // });
  });

  // socket.on('broadcast:join_room', function(data) {
  //   console.log("Event 'broadcast:join_room' emitted.");
  //   console.log("---> Data: " + data);
  // });
});
