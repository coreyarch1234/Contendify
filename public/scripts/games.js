$(function() {
  $('#join-game').onclick(function(event) {
    var code = $('game-code').val();
    // if game code exists in global variable of game connected-users
      // take user to /:code
    // else
      // u tryna join a fake ass room bruh
  });

  $('#create-game').onclick(function(event) {
    var code = $('#game-code').val();
    // push code to global gamecode array
    // redirect user to /:gameCode
  });
});
