module.exports = function(io) {

  var loadedAnswer = [];
  var participants = {};
  var participantIds = [];

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

    //Join Room
    socket.on('join_room', function(code, cb) {
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

      cb();

      // INCREMENT THE # OF PARTICIPANTS
    });

    //Answer logic
    socket.on('answer_chosen', function(data) {
        // console.log("Data: " + data.questionId);
        //Later, use game object to compare answerChosen with
        Question.findById(data.questionId).exec(function(error, question) {
          if (error) { return error };
          //   console.log("Question: " + question + " | Error: " + error);
            // console.log('Question Object: ' + question);
            var answerCorrect = question.answer;
            var answerChosen = data.answerChosen;

            console.log('Correct: ' + answerCorrect + " | Chosen: " + answerChosen);

            var status = {}
            if (answerChosen == answerCorrect) {
                status = { isCorrect: true, answer: answerCorrect } // object containing true or false the answer selected
            } else {
                status = { isCorrect: false, answer: answerCorrect }
            }

            socket.emit('client:update_isCorrect', status, function() {
              Game.findById(question.game, function(err, game) {
                if (err) { return error }
                var response = {
                  participantIds: participantIds,
                  game: game
                }
                io.in(socket.room).emit('room:update_answered', response);

              });
            });
        })
    });

    socket.on('room:next_question', function(game) {
      console.log('Question passed for context: ' + game.code);
      participantIds.push(socket.id);
      console.log('participantIds: ' + participantIds);
      if ((participantIds.length) == participants[game.code]*4) {
        participantIds = []
        io.in(socket.room).emit('room:next_question');
      } else {
        console.log("'" + socket.id + "' has selected their answer...")
        console.log("Awaiting " + (participants[game.code] - participantIds.length));
      }
    });

    socket.on('answer_created', function(data, cb) {
      Answer.create(data.answer, function(error, answer) { // Create answer object from user
        if (error) { return error }
        console.log('Fake Answer created: ' + answer);
        console.log("---------------------------------");
        // console.log("Loaded Answers: ");
        // console.log(loadedAnswer);
        Answer.find({ question: answer.question }, function(err, answers) { // find all user generated answers for this question
          console.log("Number of answers for this question: " + answers.length);

          if (answers.length == participants[data.code]) {
            console.log("All fake answers have been submitted")

            Question.findById(answer.question, function(er, question) { // Find the current question for teh correct answer
              var response = {
                ready: true,
                answers: answers.map(function(a) {
                 return a.body;
                })
              }
              response.answers.push(question.answer);
              cb(response)
            });
          } else {
            console.log("'" + socket.id + "' has entered their answer...")
            console.log("Awaiting " + (participants[data.code] - answers.length));
            var response = {
              ready: false
            }
            cb(response)
          }
        })
      });
    }); // End of socket.on('answer_created')

    socket.on('update_clients', function(data) {
      io.in(socket.room).emit('update_clients', data)
    });

  });
};
