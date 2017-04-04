$(document).on('click', #create, function(){
    var gameName = $('.newGame').val(); //Get the input game name
    if(gameName!= ''){
        var gameNumber = parseInt(Math.random() * 10000)
        socket.emit('newGame', {gameName: gameName, gameNumber: gameNumber});
        $('.newGame').val(''); //clear out the value
    }
});
