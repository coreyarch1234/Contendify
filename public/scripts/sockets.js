// ANYTHING CORRESPONDING TO THE GAME SHOW PAGE SHOULD GO HERE.
var socket = io();
var questionIndex = 0;
var gameCode = "";

//ONCE WE HIT THE GAMES SHOW PAGE, GRAB GAME CODE AND EMIT TO SERVER
$(function() {
    $('.question').first().show().addClass('current-question');
    gameCode = window.location.href.split('/')[3];
    socket.emit('join_room', gameCode);

    //
    $('body').on('click', '.answer', function(e) {
        e.preventDefault();

        var questionId = $('.current-question').data('id');
        var answerChosen = $(this).val();
        var data = {
          questionId: questionId,
          answerChosen: answerChosen
        }

        // MARK: Publishing a user having selected an answer
        socket.emit('publish:answer', data, function(result) {
          console.log("You chose: " + result);
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

    socket.emit('pub:fake_answer', data, function(result) {
      // if (result.ready) {
      //   console.log('Everyone has submitted a fake answer, showing collection of answers');
      //   // THIS IS WHERE DUP HAPPENS ON Q 2
      //   // Tells the server to show everyone the answer selection
      //   socket.emit('pub:answers', result.answers);
      // } else {
        console.log('Waiting for the rest of the players to answer')
        // FEATURE: Update all clients with who has just created an answer
      // }
    });

    // socket.on('sub:answers', function(answers) {
    //   setTimeout(function() {
    //       $('#answer-input').hide(); // hide input
    //       $('#fake-answer').val(""); // clear input
    //
    //
    //       var answer = $('.answer').first()
    //
    //       console.log("Displaying answer selection for all users...");
    //       console.log("All Answers: ");
    //       console.log(answers);
    //       for (var i = 0; i < answers.length; i++) {
    //         answer.val(answers[i]);
    //         answer = answer.next();
    //       }
    //
    //       $('#answers').show(); // display answers
    //   }, 1000);
    // });
    //
    // socket.on('subscribe:is_correct?', function(data, cb) {
    //   if (data.isCorrect) {
    //       $('#correct-answer-alert').text("Nice Job! The correct answer was: " + data.answer);
    //   } else {
    //       $('#correct-answer-alert').text("The correct answer was: " + data.answer);
    //   }
    //   cb();
    // });
    //
    // socket.on('room:update_answered', function(data) {
    //   // update dom to reflect # of people who have answered the question
    //   socket.emit('room:next_question', data);
    // });
    //
    // socket.on('room:next_question', function() {
    //   $('#correct-answer-alert').show();
    //   setTimeout(function() {
    //       $('#correct-answer-alert').text('').hide();
    //
    //       $('.current-question').hide()
    //       $('.current-question').next().show().addClass('current-question')
    //       $('.current-question').first().removeClass('current-question');
    //
    //       $('#answer-input').show(); // unhide input
    //       $('#answers').hide();
    //   }, 5000);
    // })

  });

  socket.on('sub:answers', function(answers) {
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

  socket.on('room:update_answered', function(data) {
    // update dom to reflect # of people who have answered the question
    socket.emit('room:next_question', data);
  });

  socket.on('room:next_question', function() {
    $('#correct-answer-alert').show();
    setTimeout(function() {
        $('#correct-answer-alert').text('').hide();

        $('.current-question').hide()
        $('.current-question').next().show().addClass('current-question')
        $('.current-question').first().removeClass('current-question');

        $('#answer-input').show(); // unhide input
        $('#answers').hide();
    }, 5000);
  })


});
