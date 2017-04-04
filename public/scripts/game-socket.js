$(function () {
   var socket = io();
   $('form').submit(function(){
     socket.emit('chat message', $('#m').val());
     $('#m').val('');
     return false;
   });

   socket.on('chat message', function(msg) {
      $('#messages').append($('<li>').text(msg));
    });

    // $(document).on('click', #create, function(){
    //     var gameName = $('.newGame').val(); //Get the input game name
    //     if(gameName!= ''){
    //         var gameNumber = parseInt(Math.random() * 10000)
    //         socket.emit('newGame', {gameName: gameName, gameNumber: gameNumber});
    //         $('.newGame').val(''); //clear out the value
    //     }
    // });
 });
