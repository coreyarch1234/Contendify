// $(function () {
//    // $('form').submit(function(){
//    //   socket.emit('chat message', $('#m').val());
//    //   $('#m').val('');
//    //   return false;
//    // });
//    //
//    // socket.on('chat message', function(msg) {
//    //    $('#messages').append($('<li>').text(msg));
//    //  });
//  });

 $(function () {
     $(document).on('click', '#createGame', function(){
         console.log('hello')
         var gameName = $('.newGame').val(); //Get the input game name
         console.log('hello')
         if(gameName!= ''){
             console.log(gameName)
             var gameNumber = parseInt(Math.random() * 10000)
             socket.emit('newGame');
             console.log(gameName)
             // $('.newGame').val(''); //clear out the value
         }
     });
  });
