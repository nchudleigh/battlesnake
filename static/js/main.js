/*
* @Author: bbales
* @Date:   2015-02-22 20:57:45
* @Last Modified by:   bbales - made multiplayer by gonzo
* @Last Modified time: 2015-02-24 20:48:51
*/
(function(){
    'use strict';

    game.start = function(){
        game.snakes.spawn();

        game.canvas = document.getElementById("battlesnake").getContext("2d");
        game.sizeBoard();

        setTimeout(game.mainLoop,1100);
    };

    game.mainLoop = function(){
        // Set at
        game.sizeBoard(550, 550);

        // Reset canvas
        game.canvas.clearRect(0,0,game.width+game.block,game.height+game.block);

        game.controls();

        game.copyPlayer();

        // Draw snakes
        game.snakes.drawAll();
        // Move snakes
        game.snakes.moveAll();

        // Need to be moved serverside
            // Draw food
        game.generateFood();
        game.drawFood();

        // Bullets
        game.bullets.generate();

        // Draw any explosions
        game.drawExplosions();

        // // Check for collisions
        // game.checkCollisions()

        if(game.local.player.train.length >= game.local.player.len) game.local.player.train.pop();

        game.local.player.train.unshift([game.local.player.x,game.local.player.y]);

        setTimeout(game.mainLoop,1000/game.frameRate);
    };
}());
