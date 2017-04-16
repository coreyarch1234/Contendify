
var Game = require('.../models/game/index.js');

$(function () {

    function createGameCode(){
      gameCode = Math.floor((Math.random() * 1000) + 1); //Integer between 1 and 1000
      return gameCode
    }

    $(document).ready(function(){
        var gameCode = createGameCode();
        console.log(gameCode)
        var game = new Game(gameCode, gameName);
      });
        //Create Competition
    $('#createGame').submit(function(e){
            e.preventDefault()
            // var gameName = $(this).serialize();
            var gameCode = createGameCode();
            console.log(gameCode)
            var game = new Game(gameCode, gameName);
        });
});
