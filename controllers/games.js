var express = require('express');
var router = express.Router();
//GAME CLASS
var GameLocal = require('../models/game');
//MODELS
var Game = require('../models/game/game.js');
var Question = require('../models/question/question.js');
//JSON questions
var questionJSON = require('../question-data/questions.json');
var helper = require('../sockets/helpers/generateQuestions');

// NEW GAME PAGE
router.get('/new', function(req, res) {
   res.render('games/new');
});


// CREATE THE GAME. AND AT THE SAME TIME, WE WANT TO POPULATE THE GAME WITH QUESTIONS.
router.post('/', function(req, res) {
  //Create game object
  var data = new Game(req.body);

  Game.findOne({ code: data.code }).exec(function(error, game) {
    if (game == undefined) {
      //Save Game
      data.save(function (err, savedGame) {
        if (err){ return res.status(300) };

        helper(savedGame, function(questions) {
          for (var i = 0; i < questions.length; i++) {
            savedGame.questions.push(questions[i]);

            if (i == (questions.length - 1)) {
              savedGame.save(function(error, updatedGame) {
                if (error){ return res.status(300) };
                res.send(updatedGame);
              });
            }
          }
        });
      });
    } else {
      res.send(game);
    }
  });

});

// SHOW

router.get('/:code', function(req, res) {
    Game.findOne({ code:req.params.code }).populate("questions").exec(function(err, game) {
      if (game == undefined) {
        console.log("Unable to join - Game not found...");
        res.render('games/404');
      } else {
        console.log("Game found - Enjoy yo sef...");
        res.render('games/waiting', { game: game });
      }
    });
});
router.get('/start/:code', function(req, res) {
    Game.findOne({ code:req.params.code }).populate("questions").exec(function(err, game) {
      if (game == undefined) {
        console.log("Unable to join - Game not found...");
        res.render('games/404');
      } else {
        console.log("Game found - Enjoy yo sef...");
        res.render('games/show', { game: game });
      }
    });
});

module.exports = router;
