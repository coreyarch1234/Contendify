var express = require('express')
var router = express.Router()

var Game = require('../models/game.js')

// INDEX of Game
router.get('/', function(req, res) {
  var games = Game.find(function (err, games) {
    if (err) return console.error(err)
    console.log(games)
    res.render('games', { games: games })
  })
})

// NEW of Game
router.get('/new', function(req, res) {
  res.render('new-game')
})

// CREATE of Game
router.post('/', function(req, res) {
  var game = new Game(req.body)
  console.log(game)
  game.save(function (err, game) {
    if (err) return console.error(err)
    res.send({ redirectUrl: '/games' })
  })
})

// SHOW Game
router.get('/:name', function(req, res) {
  res.render('new-game')
})

module.exports = router
