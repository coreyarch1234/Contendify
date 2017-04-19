var express = require('express');
var router = express.Router();
//GAME CLASS
var GameLocal = require('../models/game');
//MODELS
var Game = require('../models/game/game.js');
var Question = require('../models/question/question.js');
//JSON questions
var questionJSON = require('../question-data/questions.json');

// NEW GAME PAGE
router.get('/new', function(req, res) {
   res.render('games/new');
});


// CREATE THE GAME. AND AT THE SAME TIME, WE WANT TO POPULATE THE GAME WITH QUESTIONS.
router.post('/', function(req, res) {
  //Create game object
  var game = new Game(req.body);

  //Create question array
  questionsArray = []
  questionsArray.push(questionJSON.questions[0].text);

  //Create question object by filling body with question array data. MAKE THIS PROCESS A MODULAR FUNCTION
  var question = new Question({
    body: questionsArray[0],
    game: game
  });

  //Push question array in game object. Game will store only reference to questiob ID. To grab it's body, use populate
  game.questions.push(question);
  
  //Save Game
  game.save(function (err, game) {
    if (err) return console.error(err)
    console.log(game)
    res.send(game)
  });
});

// SHOW
router.get('/:code', function(req, res) {
    Game.find({ code:req.params.code }).exec(function(err, game) {
      res.render('games/show', {game: game});
    });
});

module.exports = router;
