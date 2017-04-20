module.exports = function(io) {

  var GameCodes = [];

  var Game = require('../models/game/game.js');
  var Question = require('../models/question/question.js');
  var helper = require('./helpers/nextQuestion.js');

  io.on('connection', function(socket) {

      // on create-game
        // create the game, send it back

      // on join room, do p much errythang down here plus or minus some stuff
        // like add user to game
        // add user to socket room
        // pass back that joined string thing
        // {;D<-<
      //Join Room
      socket.on('join_room', function(code, cb) {
        // var joined = 'User joined: ' + socket.id;
        // console.log(joined);
        // Game.find({ code: data }).exec(function(error, game) {
        //   GameCodes.push(game.code);
        //   // game.addUser(socket.id); //Add user
        //   // console.log("The participants are " + game.participants[0].sockId);
        //   // socket.join(game.gameCode); // Join socket to a room
        //   console.log(game)
        //   cb(game); // Redirects current user to room
        //   // io.sockets.in(game.gameCode).emit('broadcast:join_room', joined); // Notify everyone in room someone joined
        // });

        // INCREMENT THE # OF PARTICIPANTS

        //
        // Game.findOne({ code: code }).populate('questions').exec(function(err, game){
        //     //Store game code in global GameCodes array
        //     // GameCodes.push(game.code);
        //     // console.log('Hello: ')
        //     // console.log(game.questions)
        //     cb(game);
        //     //Grab questions from game to pass back in callback to fill show page
        //     // res.render('games/show', {game: game});
        // });
      });

      //Answer logic
      socket.on('answer_chosen', function(data, cb) {
          console.log("Data: " + data.questionId);
          //Later, use game object to compare answerChosen with
          Question.findById(data.questionId).exec(function(error, question) {
            //   console.log("Question: " + question + " | Error: " + error);
              if (error) { return error };
              console.log('Question Object: ' + question);
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

      socket.on('get_next', function(data, cb) {
          helper(data.code, data.index, function(question) {
              cb(question);
          })
      });

  });
};
