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
        //  console.log('hello')
         var gameName = $('.newGame').val(); //Get the input game name
        //  console.log('hello')
         if(gameName!= ''){
            //  console.log(gameName)
             var gameNumber = parseInt(Math.random() * 10000)
             socket.emit('newGame');
             console.log(gameName)
             // $('.newGame').val(''); //clear out the value
         }
     });
  });


$(function () {
    //Generate random Number
    function randomGameNumber(){
        var gameNumber = parseInt(Math.random() * 10000)
        return gameNumber
    };
    //Create Competition
    $('#createGame').submit(function(e){
        e.preventDefault();
        var game = $(this).serialize();
        // var gameNumber = randomGameNumber();
        console.log(game);
        $.ajax({
           url: '/games',
           data: game,
           fail: function() {
              alert(error.message);
           },
           dataType: 'json',
           success: function(data) {
               console.log(data)
               socket.emit(data.gameName);
               window.location.href = "/games/" + data.gameName;
           },
           type: 'POST'
        });
    });
});
