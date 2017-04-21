// ANYTHING CORRESPONDING TO THE GAME SHOW PAGE SHOULD GO HERE.
var socket = io();
var questionIndex = 0
var gameCode = ""

//ONCE WE HIT THE GAMES SHOW PAGE, GRAB GAME CODE AND EMIT TO SERVER
$(function() {
    $('.question').first().show().addClass('current-question');
    gameCode = window.location.href.split('/')[3];
    socket.emit('join_room', gameCode, function() { });

    //ONCE USER CLICKS ON AN ANSWER, GRAB TEXT AND EMIT DATA TO SERVER
    $('body').on('click', '.answer', function(e) {
        e.preventDefault();

        var questionId = $('.current-question').data('id');
        var answerChosen = $(this).val();
        var data = {
          questionId: questionId,
          answerChosen: answerChosen
        }

        //Once answer is chosen, emit it and compare with answer on server
        socket.emit('answer_chosen', data, function(result) {
          // console.log(result);

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
    });
  });

  $('#submit-lie').click(function(event) {
    var fakeAnswer = $('#fake-answer').val();
    var socketId = socket.id;
    var questionId = $('.current-question').data('id');
    var data = {
        answer: {
          body: fakeAnswer,
          socketId: socketId,
          question: questionId
        },
        code: gameCode
    }

    // console.log("Lie: " + data.answer);
    // console.log("Socket _id: " + data.socketId);
    // console.log("Question _id: " + data.questionId);

    socket.emit('answer_created', data, function(result) {
      if (result.ready) {
        console.log('Everyone has answered and we are ready to show results');

        socket.emit('update_clients', result.answers);

      } else {
        console.log('Waiting for the rest of the players to answer')
      }

    });

    socket.on('update_clients', function(answers) {
      setTimeout(function() {
          $('#answer-input').hide(); // hide input
          $('#fake-answer').text(""); // clear input

          $('#answers').show(); // display answers
          
          var answer = $('.answer').first()

          console.log("UPDATING DOM WITH ANSWERS");
          console.log("All Answers: ");
          console.log(answers);
          for (var i = 0; i < answers.length; i++) {
            answer.val(answers[i]);
            answer = answer.next();
          }
      }, 1000);
    });

  });

});
