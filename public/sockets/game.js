module.exports = function(io) {

  var Game = require('../../models/game/index.js');

  io.on('connection', function(socket) {

      // socket.on('join', function(data, cb) {
      //   var game = new Game(data.name);
      //   cb(game);
      // });

      socket.on('join_room', function(data, cb) {
        var joined = 'User joined :' + socket.id;
        console.log(joined);

        var game = new Game(data.name);
        console.log(game)

        socket.join(game.name); // Join socket to a room

        cb(game); // Redirects current user to room


        io.sockets.in(game.name).emit('broadcast:join_room', joined); // Notify everyone in room someone joined
      });

       //User sent specific message in gameName
      //  socket.on('corey', function(data){
      //      console.log(data.message)
      //  })
      //  socket.on('answered', function(data, callback){
      //     // console.log(text)
      //
      //     callback('Correct Answer')
      // })

  })
}
