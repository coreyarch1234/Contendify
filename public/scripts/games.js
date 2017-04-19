//CREATING GAME POST REQUESTS AND THE LIKE GO HERE
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
    var code = '4';
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
});
