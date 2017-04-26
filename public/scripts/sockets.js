// MARK: Script for SHOW page of game.

var socket = io(); // Create socket instance
var gameCode = ""; // Global game code set when a user connects
var numQuestions = 4; // Total # of questions

$(function() {
    // Initial setup

    // Show participants until all have joined, then start game


    $('.question').first().show().addClass('current-question');
    gameCode = window.location.href.split('/')[3];
    socket.emit('publish:join', gameCode);


    // MARK: Game event and socket logic

    // Answer selected
    $('body').on('click', '.answer', function(e) {
        e.preventDefault();

        var questionId = $('.current-question').data('id');
        var answerChosen = $(this).val();
        var data = {
          questionId: questionId,
          answerChosen: answerChosen
        }

        // Publishing a user having selected an answer
        socket.emit('publish:answer', data, function(result) {
          console.log("You chose: " + result);
        });
  });

  // Fake Answer submitted
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

    // MARK: Publishing Fake Answer
    socket.emit('publish:fake_answer', data, function(result) {
      console.log('Waiting for the rest of the players to answer');
      // FEATURE: Update all clients with who has just created an answer
    });
  });

  // MARK: Updates users' DOM to show collection of answers
  socket.on('subscribe:answers', function(answers) {
    setTimeout(function() {
        $('#answer-input').hide(); // hide input
        $('#fake-answer').val(""); // clear input


        var answer = $('.answer').first()

        console.log("Displaying answer selection for all users...");
        console.log("All Answers: ");
        console.log(answers);
        for (var i = 0; i < answers.length; i++) {
          answer.val(answers[i]);
          answer = answer.next();
        }

        $('#answers').show(); // display answers
    }, 1000);
  });

  socket.on('subscribe:is_correct?', function(data, cb) {
    if (data.isCorrect) {
        $('#correct-answer-alert').text("Nice Job! The correct answer was: " + data.answer);
    } else {
        $('#correct-answer-alert').text("The correct answer was: " + data.answer);
    }
    cb();
  });

  socket.on('subscribe:answered', function(data) {
    // update dom to reflect # of people who have answered the question
    socket.emit('publish:next_question?', data);
  });

  socket.on('subscribe:next_question?', function() {
    $('#correct-answer-alert').show();
    setTimeout(function() {
        var nextQuestionsSize = $('.current-question').next().length;
        if (nextQuestionsSize == 0) {
          alert("This is the end of the game!");
          window.location.href = '/';
          // end game
        } else {
          $('#correct-answer-alert').text('').hide();

          $('.current-question').hide()
          $('.current-question').next().show().addClass('current-question')
          $('.current-question').first().removeClass('current-question');

          $('#answer-input').show(); // unhide input
          $('#answers').hide();
        }
    }, 5000);
  })
});
