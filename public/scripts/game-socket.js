
// var Game = require('.../models/game/index.js');


$(function () {
  var socket = io();
  function changeHTML(){
      $('#connected-users').append("<p>" + 'word' + "</p>");
  };


  // changeHTML();


  $('#createGame').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var jsonData = {};
    $(data).each(function(index, obj){
      jsonData[obj.name] = obj.value[1];
      jsonData[obj.gameCode] = obj.value[0];
    });
    socket.emit('join_room', jsonData, function(game) {
      console.log('hello');
      console.log(game);
    });
    // window.location.href = "/games/" + jsonData.name;
    window.location.href = "/games/" + jsonData.gameCode;

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
    changeHTML();
    //All of the users in the room

  });

});
