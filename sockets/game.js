module.exports = function(io) {

  var loadedAnswer = [];
  var participants = {};

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
    socket.on('answer_chosen', function(data, cb) {
        // console.log("Data: " + data.questionId);
        //Later, use game object to compare answerChosen with
        Question.findById(data.questionId).exec(function(error, question) {
          //   console.log("Question: " + question + " | Error: " + error);
            if (error) { return error };
            // console.log('Question Object: ' + question);
            var answerCorrect = question.answer;
            var answerChosen = data.answerChosen;
            console.log('Correct: ' + answerCorrect + " | Chosen: " + answerChosen);
            if (answerChosen == answerCorrect) {
                cb({ isCorrect: true, answer: answerCorrect }); // object containing true or false the answer selected
            } else {
                cb({ isCorrect: false, answer: answerCorrect });
            }
        })
    });

    socket.on('answer_created', function(data, cb) {
      Answer.create(data, function(error, answer) {
        if (error) { return error }


        // console.log(answer);

      });
    });

  });
};
