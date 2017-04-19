// ANYTHING CORRESPONDING TO THE GAME SHOW PAGE SHOULD GO HERE.
var socket = io();

//ONCE WE HIT THE GAMES SHOW PAGE, GRAB GAME CODE AND EMIT TO SERVER
$(function() {
  var code = window.location.href.split('/')[3];
  socket.emit('join_room', code, function(game) {
    // console.log('Game: ' + game);
 });

 //Fill page in with questions and answers
 // function questionAnswerFill(){
 //     $('question').append('<h1>' + Which of these letters is a B ? + '</h1>');
 // }

//ONCE USER CLICKS ON AN ANSWER, GRAB TEXT AND EMIT DATA TO SERVER
$('body').on('click', '.answer', function(e) {
  e.preventDefault();
  var answerChosen = $(this).val();
  //Once answer is chosen, emit it and compare with answer on server
  socket.emit('answer_chosen', answerChosen, function(result){
      console.log(result);
  });
});

 // socket.on('broadcast:join_room', function(data) {
 //   console.log("Event 'broadcast:join_room' emitted.");
 //   console.log("---> Data: " + data);
 //   console.log($('#connected-users'));
 //   $('#connected-users').append($('<p>').text(data));
 // });
});
