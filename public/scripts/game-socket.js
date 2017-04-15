$(function () {
  // $(document).ready(function(){
  //   //Question One
  //   questionNumber = "One"
  //   optionOneText = getData("One");
  //   $("#optionOne").append("<a href='#'>" + "<p>" + "$$x = " + optionOneText + ".$$" + "</p>" + "</a></br>").click(function(){
  //     //Grab socket id and option text and emit
  //     var id = socket.io.engine.id
  //     socket.emit('answered', optionOneText, function(data){
  //       console.log(data);
  //     });
  //   });

    //Create Competition
$('#createGame').submit(function(e){
        e.preventDefault()
        var game = $(this).serialize()
        console.log(game);
        $.ajax({
           url: '/games',
           data: game,
           fail: function() {
              alert(error.message)
           },
           dataType: 'json',
           success: function(data) {
               console.log(data)
               window.location.href = "/games/" + data.name;
               console.log('Redirected to game, socket will now be created for this game...')
            //    tell server to make nsp socket for this game
               socket.emit(data.name, data)
           },
           type: 'POST'
        });
    });
  });
// });
