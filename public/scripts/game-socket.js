
$(function () {
    //Option click logic
    // function myFunction() {
    //     var x = document.getElementById("mySelect").options.length;
    //     document.getElementById("demo").innerHTML = "Found " + x + " options in the list.";
    // }

    //Create Competition
    $('#createGame').submit(function(e){
        e.preventDefault();
        var game = $(this).serialize();
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

           },
           type: 'POST'
        });
    });
});
