/*
* @Author: bbales
* @Date:   2015-02-22 20:57:45
* @Last Modified by:   bbales - made multiplayer by gonzo
* @Last Modified time: 2015-02-24 20:48:51
*/
(function(){
    'use strict';

    game.start = function(){

        game.canvas = document.getElementById("battlesnake").getContext("2d");
        game.sizeBoard(game.config.board.width, game.config.board.height);

        game.socket = io.connect('');
        game.socket.on('connect', function(){
            console.log('connected');
        })
        game.socket.on('gameState', function(state){
            game.state = state;
            // console.log(game.state);
        })
        game.socket.on('userIdSet', function(userId){
            console.log(userId);
            game.socket.userId = userId;
        })
        game.socket.on('updateLength', function(snake){
            if(game.socket.userId != snake.id)return;
            document.getElementById('HUDlength').innerHTML ='LENGTH:'+snake.len;
        });
        game.socket.on('updateKills', function(snake){
            if(game.socket.userId != snake.id)return;
            document.getElementById('HUDkills').innerHTML ='KILLS:'+snake.kills;
        });


        setTimeout(game.mainLoop,1100);
    };

    game.mainLoop = function(){
        // Reset canvas
        game.canvas.clearRect(0,0,game.config.board.width+game.block,game.config.board.height+game.block);

        game.snakes.drawAll();
        game.drawFood();
        game.drawExplosions();

        setTimeout(game.mainLoop,1000/game.frameRate);
    };
}());
