var _dir = '/home/gonzo/Development/battlesnake/'

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/static'))

var snakes = require('./modules/snakes')
var util = require('./modules/util')
var game = require('./modules/game')


var http = require('http');
var server = http.createServer(app);
server.listen(8000);

var io = require('socket.io')(server);


app.get('/', function (request, response) {
    console.log('Initial get')
});


io.on('connection', function (socket) {
    var userId = snakes.functions.spawn();
    socket.emit('gameState', game.state);
    socket.emit('userIdSet', userId);
    socket.on('keyPress', function(data){
        console.log('keyPress', data);
    });
    socket.on('disconnect', function(e){
        console.log(e);
    })
});


function main(){
    util.functions.generateFood();
    snakes.functions.moveAll();
    // game.bullets.generate();
    // game.checkCollisions()

    io.emit('gameState', game.state)
    setTimeout(main,1000/game.config.frameRate);
};
main();
