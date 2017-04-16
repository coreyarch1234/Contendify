var express = require('express')
var router = express.Router()
var Game = require('../models/game/index.js')

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
  console.log('Running POST on server');
  var game = new Game(req.body.name);
  console.log(game);
  res.send(game);
  // game.save(function (err, game) {
  //   if (err) return console.error(err)
  //   res.send(game)
  // });
});

// SHOW
router.get('/:name', function(req, res) {
    // Game.find({gameName:req.params.gameName}).exec(function(err, game) {
    //   res.render('games/show', {game: game});
    // });
    res.render('games/show');
});

module.exports = router;
