/*
* @Author: bbales
* @Date:   2015-02-24 13:41:01
* @Last Modified by:   bbales
* @Last Modified time: 2015-02-24 19:28:46
*/
(function(){
    'use strict';
    game.snakes = {};

    game.snakes.drawAll = function(){
        for(var sn=0; sn<game.state.snakes.length; sn++){
            game.snakes.draw(game.state.snakes[sn]);
        }
    };

    game.snakes.draw = function(sn){
        for(var i in sn.train){
            game.canvas.fillStyle = sn.color;
            game.canvas.fillRect(sn.train[i][0],sn.train[i][1],game.block,game.block);
        }

        game.canvas.fillStyle = sn.color;
        game.canvas.fillRect(sn.x,sn.y,game.block,game.block);

        game.snakes.drawEyes(sn);
    };

    game.snakes.drawEyes = function(sn){
        // This needs abstraction really badly
        game.canvas.fillStyle = "white";
        if(sn.dir === UP){
            game.canvas.fillRect(sn.x+game.block/10,sn.y+game.block/10,game.block/5,game.block/3);
            game.canvas.fillRect(sn.x+(game.block-game.block/10 - game.block/5),sn.y+game.block/10,game.block/5,game.block/3);
        }else if(sn.dir === DOWN){
            game.canvas.fillRect(sn.x+game.block/10,sn.y+game.block-game.block/10 - game.block/3,game.block/5,game.block/3);
            game.canvas.fillRect(sn.x+(game.block-game.block/10 - game.block/5),sn.y+game.block-game.block/10 - game.block/3,game.block/5,game.block/3);
        }else if(sn.dir === RIGHT){
            game.canvas.fillRect(sn.x+game.block-game.block/10 - game.block/3,sn.y+game.block/10,game.block/3,game.block/5);
            game.canvas.fillRect(sn.x+game.block-game.block/10 - game.block/3,sn.y+(game.block-game.block/10 - game.block/5),game.block/3,game.block/5);
        }else if(sn.dir === LEFT){
            game.canvas.fillRect(sn.x+game.block/10,sn.y+game.block/10,game.block/3,game.block/5);
            game.canvas.fillRect(sn.x+game.block/10,sn.y+(game.block-game.block/10 - game.block/5),game.block/3,game.block/5);
        }
    };
}());
