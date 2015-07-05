var _dir = '/home/gonzo/Development/battlesnake/'

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/static'))

var snakes = require('./modules/snakes')
var util = require('./modules/util')
var game = require('./modules/game')
var keyboard = require('./modules/keyboard')


var http = require('http');
var server = http.createServer(app);
server.listen(8000, "0.0.0.0");

global.io = require('socket.io')(server);


app.get('/', function (request, response) {
    console.log('Initial get')
});


io.on('connection', function (socket) {
    var snake = snakes.functions.spawn();
    socket.emit('gameState', game.state);
    socket.emit('userIdSet', snake.id);
    socket.on('keyPress', function(data){
        keyboard.functions.readKeyPress(data, snake);
    });
    socket.on('disconnect', function(e){
        console.log(e);
    })
});


function main(){
    util.functions.generateFood();
    snakes.functions.moveAll();
    snakes.functions.checkFood();
    snakes.functions.checkAllCollisions();
    // game.bullets.generate();

    io.emit('gameState', game.state)
    setTimeout(main,1000/game.config.frameRate);
};
main();
