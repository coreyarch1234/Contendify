module.exports = function(io) {
  io.on('connection', function(socket) {

       //User sent specific message in gameName
       socket.on('corey', function(data){
           console.log(data.message);
       });
       socket.on('answered', function(data, callback){
          // console.log(text);

          callback('Correct Answer');
      });

  });
};
