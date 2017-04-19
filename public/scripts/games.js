$(function() {
  $('#join-game').click(function(event) {
    var code = $('game-code').val();
    // if game code exists in global variable of game connected-users
      // take user to /:code
    // else
      // u tryna join a fake ass room bruh
  });

  $('#create-game').click(function(event) {
    var name = $('#game-name').val();
    var code = '0';
    var gameObj = {};
    gameObj['name'] = name;
    gameObj['code'] = code;

    $.ajax({
      type: 'POST',
      url: '/',
      data: gameObj,
      dataType: 'JSON',
      fail: function() {
        alert(error.message);
      },
      success: function(game) {
        alert('Game Created succesfuly - Redirecting');
        window.location.href = '/' + game.code;
      }
    });
  });

  $('body').on('click', '.answer', function(e) {
      e.preventDefault();
      var answerChosen = $(this).val();
      //Once answer is chosen, emit it and compare with answer on server
      socket.emit('answer_chosen', answerChosen, function(result){
          console.log(result);
      });
    //   console.log(answerChosen);
  });

});
