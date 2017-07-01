// MARK: Script for SHOW page of game.

var socket = io(); // Create socket instance
var gameCode = ""; // Global game code set when a user connects
var numQuestions = 2; // Total # of questions (unused atm)
var maxPlayers = 2 // Unused atm as well
var participants = 0;

$(function() {

    $('.question').first().show().addClass('current-question');
    gameCode = window.location.href.split('/')[4];
    socket.emit('publish:join', gameCode);

    // // MARK: New (for waiting room)
    // // Initial setup
    //
    // // update waiting screen with joined players, then start game
    // $('.last-user').next().addClass('conected last-user')
    // $('.last-user').first().removeClass('last-user').removeClass('waiting');
    // gameCode = window.location.href.split('/')[3];
    // socket.emit('publish:join', gameCode, function() {
    //   participants += 1;
    //   if (participants == maxPlayers) {
    //     // hide watiing screen html
    //     // segue to show question
    //     $('.question').first().show().addClass('current-question');
    //   }
    // });
    // // MARK: End




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
    //   console.log("Hit correct")
    if (data.isCorrect) {
        console.log("Hit correct")
        console.log(data.answer)
        // $('#score-display').text(data.score);
        $('#correct-answer-alert').html("<span style='color: #39b54a;font-size:1.2em;'>Correct!</span><br> <span style='font-size:0.7em;color: #aaa;padding-top:5px;'>YOUR SCORE:</span>  <br><span style='font-size: 3em; color: #39b54a;padding-bottom:5px;'>" + data.score + "</span>").removeClass("answer-alert-display");
    } else {
        console.log("Hit incorrect")
        console.log(data.answer)
        // $('#score-display').text(data.score);
        $('#correct-answer-alert').html("<span style='color: #ff4c4c;font-size:1.2em;'>Incorrect.</span><br> The correct answer is <u>" + data.answer + ".</u><br> <span style='font-size:0.7em;color: #aaa;padding-top:5px;'>YOUR SCORE:</span> <br><span style='font-size: 3em; color: #39b54a;padding-bottom:5px;'>" + data.score + "</span>").removeClass("answer-alert-display");
    }
    cb();
  });

  socket.on('subscribe:answered', function(data) {
    // Show updated score
    // for (var i = 0; i < data.users.length; i++){
    //     if (data.users[i].sockId === socket.id) {
    //     //   return data.users[i];
    //       $('#correct-answer-alert').text(data.users[i].score);
    //     }
    // }
    // $('#correct-answer-alert').text(data.score);
    // console.log(data.score)
    // update dom to reflect # of people who have answered the question
    socket.emit('publish:next_question?', data);
  });

  socket.on('subscribe:next_question?', function() {
    $('.answer-alert-display').show();
    setTimeout(function() {
        var nextQuestionsSize = $('.current-question').next().length;
        if (nextQuestionsSize == 0) {
          alert("This is the end of the game!");
          window.location.href = '/';
          // end game
        } else {
          $('#correct-answer-alert').text('');

          $('.current-question').hide()
          $('.current-question').next().show().addClass('current-question');
          $('.current-question').first().removeClass('current-question');

          $('#answer-input').show(); // unhide input
          $('#answers').hide();


        }
    }, 5000);
  })
});
