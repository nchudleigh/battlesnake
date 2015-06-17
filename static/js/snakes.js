/*
* @Author: bbales
* @Date:   2015-02-24 13:41:01
* @Last Modified by:   bbales
* @Last Modified time: 2015-02-24 19:28:46
*/
(function(){
    'use strict';
    game.snakes = {};

    game.snakes.colors=['#42033D','#9A031E','#7C238C','#89023E','#064E86'];

    game.snakes.randomId = function(){
        function s4(){
            return Math.floor((1+Math.random())* 0x10000)
            .toString(16);
        }
        return s4()+s4()+s4()+s4();
    };

    // returns new player
    game.snakes.generate = function(){
        var player = {
                id: game.snakes.randomId(),
                color: game.randomColor(game.snakes.colors), // This will  need to randomize or be a special color for the client and
                dir : game.randomDir(), // randomize
                x : 100, // randomize based on board
                y : 100,
                len : 3,
                train : [],
                kills : 0,
                deaths : 0
        };
        return player;
    };

    game.snakes.spawn = function(){
        var tmp = game.snakes.generate();
        game.state.snakes.push(tmp);
        game.local.player = (tmp);
    };

    game.snakes.moveAll = function(){
        for(var sn=0; sn<game.state.snakes.length; sn++){
            game.snakes.move(game.state.snakes[sn]);
        }
    };

    game.snakes.move = function(sn){
        switch(sn.dir){
            case UP:
                sn.y -= game.block;
                break;
            case DOWN:
                sn.y += game.block;
                break;
            case LEFT:
                sn.x -= game.block;
                break;
            case RIGHT:
                sn.x += game.block;
                break;
        }

        // Edge detection
        if(sn.x < 0) sn.x = game.width-game.block;
        else if(sn.x >= game.width-game.block) sn.x = 0;
        if(sn.y < 0) sn.y = game.height - game.block;
        else if(sn.y > game.height - game.block) sn.y = 0;

    };

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

    game.snakes.addPoints = function(points){
        game.local.player.len += points;
        if(game.local.player.len >= game.maxLen)game.local.player.len = game.maxLen;
        console.log(game.local.player.len, game.local.player.train)
        document.getElementsByClassName("length")[0].innerHTML = game.local.player.len;
    };
}());
