class Game {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.participants = []
    }

    userJoin(sockId, score = 0) {
        let newUser = {
            sockId: sockId,
            score: score
        }
        this.participants.push(newUser)
    }
}

module.exports = Game

var newGame = new Game('Q3F4', 'TestGame')

console.log(newGame.id)
