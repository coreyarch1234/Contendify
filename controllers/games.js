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
  var game = new Game(req.body);

  //Create question array
  // var questionsArray = []
  // questionsArray.push(questionJSON.questions[0].text);

  //Create question object by filling body with question array data. MAKE THIS PROCESS A MODULAR FUNCTION
  // var question = new Question({
  //   body: questionsArray[0],
  //   game: game._id
  // });

  // question.save(function (err, savedQuestion) {
  //   if (err) return console.error(err)
  //   game.questions.push(savedQuestion);
  //   game.save(function(error, savedGame) {
  //       if (error) return console.error(error);
  //       res.send(savedGame);
  //   })
    // console.log('the question has been saved:' + question);
    // res.send(game)
  // });



  //Push question array in game object. Game will store only reference to questiob ID. To grab it's body, use populate
  // game.questions.push(question);
  // console.log(game.questions)

  //Save Game
  game.save(function (err, game) {
      if (err){ return res.status(300) };

      helper(game, function(questions) {
          for (var i = 0; i < questions.length; i++) {
              game.questions.push(questions[i]);

              if (i == (questions.length - 1)) {
                  game.save(function(error, savedGame) {
                      if (error){ return res.status(300) };
                      res.send(savedGame);
                  });
              }
          }
      });

    //Create question array
    // questionsArray = []
    // questionsArray.push(questionJSON.questions[0].text);
    //
    // //Create question object by filling body with question array data. MAKE THIS PROCESS A MODULAR FUNCTION
    // var question = new Question({
    //   body: questionsArray[0],
    //   game: game._id
    // });
    //
    // question.save(function (error, question) {
    //   if (error){ return res.status(300) };
    //   // console.log('the question has been saved:' + question);
    //   // res.send(game)
    //   game.questions.push(question);
    //   game.save(function(errr, updatedGame) {
    //       if (errr){ return res.status(300) };
    //       res.send(updatedGame);
    //   })
    });
});

// });

// SHOW
router.get('/:code', function(req, res) {
    Game.findOne({ code:req.params.code }).populate("questions").exec(function(err, game) {
      res.render('games/show', { game: game });
    });
});

module.exports = router;
