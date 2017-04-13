
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
        // console.log(game);
        $.ajax({
           url: '/games',
           data: game,
           fail: function() {
              alert(error.message);
           },
           dataType: 'json',
           success: function(data) {
            //    console.log(data)
               window.location.href = "/games/" + data.gameName;
               console.log('Redirected to game, socket will now be created for this game...');
            //    tell server to make nsp socket for this game
               socket.emit(data.gameName, data);
            //    socket.emit('apple', data);

           },
           type: 'POST'
        });
    });
});
