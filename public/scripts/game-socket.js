
// var Game = require('.../models/game/index.js');

$(function () {
  var socket = io();

  $('#createGame').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var jsonData = {};
    jsonData['name'] = data[0].value;
    jsonData['gameCode'] = data[1].value;
    // var key_bool = false
    // $(data).each(function(index, obj){
    //     if key_bool == false {
    //         key = obj.name;
    //     }
    //     else{
    //         key = obj.gameCode;
    //     }
    //      jsonData[key] = obj.value;
    //      key_bool = true;
    // });
    // console.log('Data: ' + jsonData.gameCode);
    // window.location.href = "/games/" + jsonData.name;
    window.location.href = "/games/" + jsonData.gameCode;
    socket.emit('join_room', jsonData, function(game) {
      console.log('hello');
      console.log(game);
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
    console.log(data)
    console.log("---> Data: " + data);

    //All of the users in the room

    // $('#connected-users').append("<p>" + data + "</p>");
  });
});
