module.exports = function(io) {

  var GameCodes = [];

  var Game = require('../../models/game/game.js');
  var Question = require('../../models/question/question.js');

  io.on('connection', function(socket) {

      // on create-game
        // create the game, send it back

      // on join room, do p much errythang down here plus or minus some stuff
        // like add user to game
        // add user to socket room
        // pass back that joined string thing
        // {;D<-<
      //Join Room
      socket.on('join_room', function(data, cb) {
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

        Game.findOne({ code: data }).populate('questions').exec(function(err, game){
            //Store game code in global GameCodes array
            GameCodes.push(game.code);
            console.log('Hello: ')
            console.log(game.questions)
            cb(game);
            //Grab questions from game to pass back in callback to fill show page
            // res.render('games/show', {game: game});
        });
      });

      //Answer logic
      socket.on('answer_chosen', function(data, cb) {
          //Later, use game object to compare answerChosen with
          var answerChosen = data;
          var correctAnswer = 'B'
          if (answerChosen == correctAnswer) {
              cb('Correct!')
          }
      });
  });
};
