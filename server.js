var express = require('express')
var exphbs  = require('express-handlebars')
var app = express()
var bodyParser = require('body-parser')
var http = require('http')
var httpServer = http.createServer(app)
var io = require('socket.io')(httpServer)
var port = 3000

// Custom Imports
var sockets = require('./sockets');

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Setting templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// Setting up Database
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/contendify')

// JWT Authentication
var jwt = require('express-jwt')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// Controller Imports
var games = require('./controllers/games')

// Routing
app.get('/', function(req, res){
    res.render('home')
})

app.use('/games', games)


// Socket Logic
io.sockets.on('connection', function(socket) {

     //User sent specific message in gameName
     socket.on('corey', function(data){
         console.log(data.message)
     })
     socket.on('answered', function(data, callback){
        // console.log(text)

        callback('Correct Answer')
    })

})

// Deploy
httpServer.listen(process.env.PORT || port, function() {
    console.log("Contendify is live at: " + port)
})

module.exports = httpServer
