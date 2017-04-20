// ANYTHING CORRESPONDING TO THE GAME SHOW PAGE SHOULD GO HERE.
var socket = io();
var questionIndex = 0
var gameCode = ""

//ONCE WE HIT THE GAMES SHOW PAGE, GRAB GAME CODE AND EMIT TO SERVER
$(function() {
    gameCode = window.location.href.split('/')[3];
    socket.emit('join_room', gameCode, function(game) { });

    //Fill page in with questions and answers
    // function questionAnswerFill(){
    //     $('question').append('<h1>' + Which of these letters is a B ? + '</h1>');
    // }

    //ONCE USER CLICKS ON AN ANSWER, GRAB TEXT AND EMIT DATA TO SERVER
    $('body').on('click', '.answer', function(e) {
        e.preventDefault();
        console.log();
        var questionId = $('.current-question').data('id');
        var answerChosen = $(this).val();
        var data = {
          questionId: questionId,
          answerChosen: answerChosen
        }
        // console.log(data);
        //Once answer is chosen, emit it and compare with answer on server
        socket.emit('answer_chosen', data, function(result) {
          console.log(result);

          if (result.isCorrect) {
              $('#correct-answer-alert').text("Nice Job! The correct answer was: " + result.answer).show()
          } else {
              $('#correct-answer-alert').text("The correct answer was: " + result.answer).show()
          }

          setTimeout(function() {
              $('#correct-answer-alert').text('').hide();

              $('.current-question').hide()
              $('.current-question').next().show().addClass('current-question')
              $('.current-question').first().removeClass('current-question');
          }, 5000);

        //   var data = {
        //       code: gameCode,
        //       index: questionIndex
        //   }
        //   setTimeout(function() {
          //
        //       socket.emit('get_next', data, function(question) {
        //           console.log('question :' + question)
        //           $('#question').text = question.text;
        //           $('#_id').text(question._id);
        //       });
        //   }, 5000);
        //   display correct or incorrect stuff
        // dipslay timer for next question
        // when that is over, display next question
    });
});




 // socket.on('broadcast:join_room', function(data) {
 //   console.log("Event 'broadcast:join_room' emitted.");
 //   console.log("---> Data: " + data);
 //   console.log($('#connected-users'));
 //   $('#connected-users').append($('<p>').text(data));
 // });
});
