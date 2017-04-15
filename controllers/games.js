var express = require('express')
var router = express.Router()

var Game = require('../models/game.js')

// INDEX of Game
// router.get('/', function(req, res) {
//   var games = Game.find(function (err, games) {
//     if (err) return console.error(err)
//     console.log(games)
//     res.render('games', { games: games })
//   })
// })

// NEW
router.get('/new', function(req, res) {
  res.render('games/new');
});

// CREATE
router.post('/', function(req, res) {
  var game = new Game(req.body)
  var gameName = game.name
  console.log(gameName)
  game.save(function (err, game) {
    if (err) return console.error(err)
    res.send(game)
  });
});

// SHOW
router.get('/:gameName', function(req, res) {
    Game.find({gameName:req.params.gameName}).exec(function(err, game) {
      res.render('games/show', {game: game});
    });
});

module.exports = router;
