$(function () {
  var socket = io();

  $('#createGame').submit(function(e) {
    e.preventDefault();
    // var data = $(this).serialize();

    var data = $(this).serializeArray();
    var jsonData = {};

    $(data).each(function(index, obj){
      jsonData[obj.name] = obj.value;
    });
    // var game = new Game($(this).serialize().name);
    // console.log(game);
    window.location.href = "/games/" + jsonData.name;
    // socket.emit('join_game', data);
    socket.emit('join_room', jsonData, function(game) {
      console.log('hello');
      // window.location.href = "/games/" + game.name;
      console.log(game);
      // $('#connected-users').append("<p>Socket " + "'data'" + "joined the room</p>");
    });

    // $.ajax({
    //   url: '/games',
    //   data: game,
    //   fail: function() {
    //     alert(error.message);
    //   },
    //   dataType: 'json',
    //   success: function(data) {
    //     // console.log(data);
    //     window.location.href = "/games/" + data.name;
    //     console.log('Redirected to game, socket will now be created for this game...')
    //     //    tell server to make nsp socket for this game
    //     //  socket.emit(data.name, data)
    //     // socket.emit('join_game', data);
    //   },
    //   type: 'POST'
    // });
  });

  socket.on('broadcast:join_room', function(data) {
    console.log("Event 'broadcast:join_room' emitted.");
    console.log("---> Data: " + data);

    // $('#connected-users').append("<p>Socket " + "'" + data + "'" + "joined the room</p>");
    $('#connected-users').append("<p>" + data + "</p>");
  });
});
