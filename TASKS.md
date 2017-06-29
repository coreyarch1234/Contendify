# Contendify
List of current tasks

## Scoring

We want to be able to keep track of a player's score. Since player's should lose point(s) when they answer incorrectly, each player should start with a score that is greater than 0.

Each player will start with a score equal to the number of questions plus 10. They will lose a point for every question they answer incorrectly. They will gain a point when they answer a question correctly. We will include the mechanic where a player gains points proportional to the number of times other players choose their dummy answer later.

How to implement:

* In 'models/game/game.js'
    * Create a gameScore field with a default of 0
* In 'sockets/game.js'
    * Create a global gameScore variable equal to 12 (2 questions + 10)
    * In socket.on('publish:answer...'), increment gameScore by 1 if they got it right and decrement by 1 otherwise
    * In response object, add gameScore key and pass it that score.
    * Update gameScore field in Game model
* In 'views/games/show.handlebars'
    * Create div with id='score-display'
* In 'public/scripts/sockets.js'
    * In socket.on('subscribe:answered'...), update text of 'score-display' in show.handlebars to be data.gameScore
