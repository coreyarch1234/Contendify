module.exports = function(io) {

  var participants = {};
  var participantIds = [];
  var excessArray = [];

  var Game = require('../models/game/game.js');
  var Question = require('../models/question/question.js');
  var Answer = require('../models/answer/answer.js');
  var helper = require('./helpers/nextQuestion.js');

  io.on('connection', function(socket) {

    socket.on('disconnect', function() {
      console.log("Removing '" + socket.id + "' from room '" + socket.room + "'...");
      participants[socket.room]--;
      console.log("Remaining participants: ");
      console.log(participants);
    });

    // MARK: Adding user to room
    socket.on('publish:join', function(code, cb) {
      socket.join(code);
      socket.room = code;
      console.log("User '" + socket.id + "' joined...");
      console.log("user is now in : " + socket.room);

      if (participants[code] == undefined) {
        participants[code] = 1;
      } else {
          participants[code]++;
      }

      console.log("Participants: ");
      console.log(participants);
    });

    // MARK: Receiving users' selected answer
    socket.on('publish:answer', function(data) {
        console.log("------------------------------");
        console.log("-      'publish:answer'      -");
        console.log("------------------------------");

        // Find the question this user is answering
        Question.findById(data.questionId).exec(function(error, question) {
          if (error) { return error };
            var answerCorrect = question.answer; // Correct Answer
            var answerChosen = data.answerChosen; // Users' answer

            var status = {} // Data we want to send to the client/user
            if (answerChosen == answerCorrect) {
                status = { isCorrect: true, answer: answerCorrect }
            } else {
                status = { isCorrect: false, answer: answerCorrect }
            }

            // MARK: Updating the users' dom (hidden field) with whether they were correct or incorrect
            socket.emit('subscribe:is_correct?', status, function() {
              Game.findById(question.game, function(err, game) {
                if (err) { return error }
                var response = {
                  participantIds: participantIds,
                  game: game,
                  socketId: socket.id
                }
                io.in(socket.room).emit('subscribe:answered', response);
                // update everyone's dom, the, after this is 100% complete, do stuff
              });
            });
        })
    });

    // MARK: Checked if we are to mvoe on to the next question or not
    socket.on('publish:next_question?', function(data) {
      //Check my socket id with everyone else's...if my socket id is there twice
      excessArray.push(data.socketId)
      console.log("excessArray size: " + excessArray.length);
      if (excessArray.length == 4) {
        participantIds.push(data.socketId);
        excessArray = [];

        console.log("'" + data.socketId + "' has selected their answer...");
        console.log("The number of participants: " + participantIds.length);
        console.log("Awaiting " + (participants[data.game.code] - participantIds.length));

        if ((participantIds.length) == participants[data.game.code]) {
          console.log("All users have chosen an answer, now moving on to next question.");
          participantIds = [];
          io.in(socket.room).emit('subscribe:next_question?');
        }
      }
    });

    // MARK: Receiving users fake answer before answering
    socket.on('publish:fake_answer', function(data, cb) {
      // Create answer object from user's input
      Answer.create(data.answer, function(error, answer) {
        if (error) { return error };
        console.log("---------------------------------");
        console.log('Fake Answer created: ' + answer);

        // Find all fake answers for this question
        Answer.find({ question: answer.question }, function(err, answers) {

          console.log("Number of fake answers for this question: " + answers.length);

          // If all users have submitted a fake answers
          if (answers.length == participants[data.code]) {
            console.log("All fake answers have been submitted")

            // Find the question these fake answers are for so we can get the correct one too
            Question.findById(answer.question, function(er, question) {
              // Add all the fake answers and the real answer to the response
              var response = {
                ready: true,
                answers: answers.map(function(a) {
                 return a.body;
                })
              }
              response.answers.push(question.answer);
              // cb(response)
              console.log('Everyone has submitted a fake answer, showing collection of answers');
              io.in(socket.room).emit('subscribe:answers', response.answers);
            });
          } else {
            console.log("'" + socket.id + "' has entered their answer...")
            console.log("Awaiting " + (participants[data.code] - answers.length));
            var response = { ready: false }
            cb(response)
          }
        })
      });
    }); // End of socket.on('answer_created')

    socket.on('pub:answers', function(data) {
      io.in(socket.room).emit('sub:answers', data)
    });

  });
};
