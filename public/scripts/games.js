//CREATING GAME POST REQUESTS AND THE LIKE GO HERE
function generateCode() {
  return Math.round((Math.pow(36, 4 + 1) - Math.random() * Math.pow(36, 4))).toString(36).slice(1);
}

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
    var code = generateCode();
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

  $('#join-game').click(function(event) {
    var code = $('#game-code').val();

    alert('Trying to join game...');
    window.location.href = '/' + code;
  });

});
