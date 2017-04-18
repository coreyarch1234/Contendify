module.exports = function(io) {

  var GameCodes = [];

  var Game = require('../../models/game');

  io.on('connection', function(socket) {

      // on create-game
        // create the game, send it back

      // on join room, do p much errythang down here plus or minus some stuff
        // like add user to game
        // add user to socket room
        // pass back that joined string thing
        // {;D<-<

      socket.on('join_room', function(data, cb) {
        var joined = 'User joined: ' + socket.id;
        console.log(joined);
        var gameName = "Supa Cool"
        var game = new Game(data.gameCode, gameName);
        GameCodes.push(game.gameCode);
        game.addUser(socket.id); //Add user

        console.log("The participants are " + game.participants[0].sockId);

        socket.join(game.gameCode); // Join socket to a room

        cb(game); // Redirects current user to room

        io.sockets.in(game.gameCode).emit('broadcast:join_room', joined); // Notify everyone in room someone joined
      });
  });
};