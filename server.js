var _dir = '/home/gonzo/Development/battlesnake/'

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/static'))

var http = require('http');
var server = http.createServer(app);
server.listen(8000);

var io = require('socket.io')(server);


app.get('/', function (request, response) {
    console.log('Initial get')
});


io.on('connection', function (socket) {
    console.log('connected')
});
