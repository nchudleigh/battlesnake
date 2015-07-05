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
        game.sizeBoard();

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

        setTimeout(game.mainLoop,1100);
    };

    game.mainLoop = function(){
        // Set at
        game.sizeBoard(550, 550);

        // Reset canvas
        game.canvas.clearRect(0,0,game.width+game.block,game.height+game.block);

        game.snakes.drawAll();
        game.drawFood();
        game.drawExplosions();

        //
        // if(game.local.player.train.length >= game.local.player.len) game.local.player.train.pop();
        //
        // game.local.player.train.unshift([game.local.player.x,game.local.player.y]);

        setTimeout(game.mainLoop,1000/game.frameRate);
    };
}());
