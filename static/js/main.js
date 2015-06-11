/*
* @Author: bbales
* @Date:   2015-02-22 20:57:45
* @Last Modified by:   bbales - made multiplayer by gonzo
* @Last Modified time: 2015-02-24 20:48:51
*/
(function(){
    'use strict';

    game.start = function(){
        game.reset();

        game.canvas = document.getElementById("battlesnake").getContext("2d");
        game.sizeBoard();

        setTimeout(game.mainLoop,1100);
    };

    game.mainLoop = function(){
        game.sizeBoard();

        // Check for game over
        if(game.flags.gameover){
            game.over();
            return;
        }

        // Stall if paused
        if(game.flags.paused){
            // Paused loop
            setTimeout(game.mainLoop,1000/game.frameRate);
            return;
        }

        // Reset canvas
        game.canvas.clearRect(0,0,game.width+game.block,game.height+game.block);

        game.controls();

        // Draw snakes
        game.snakes.drawAll();

        // Draw food
        game.generateFood();

        // Bullets
        game.bullets.generate();

        // Draw any explosions
        game.drawExplosions();

        // Check for collisions
        var collisions = 0;

        for(var i in game.player.train){
            if(game.player.train[i][0] == game.player.x && game.player.train[i][1] == game.player.y){
                collisions++;
                game.flags.result = P1LOSS;
                break;
            }
        }

        if(game.player.train.length >= game.player.len) game.player.train.pop();
        game.player.train.unshift([game.player.x,game.player.y]);


        setTimeout(game.mainLoop,1000/game.frameRate);
    };
}());
