/*
* @Author: bbales
* @Date:   2015-02-23 11:40:08
* @Last Modified by:   bbales
* @Last Modified time: 2015-02-24 20:26:08
*/
var size = [window.width,window.height];

(function(){
    'use strict';

    game.randomDir = function(){
        return Math.round(Math.random()*3)+1;
    };

    game.randomColor = function(colors){
        var i = Math.round(Math.random()*(colors.length-1));
        return colors[i];
    };

    game.quantize = function(int){
        return Math.round(int/10)*10;
    };

    game.copyPlayer = function(){
        for(var i=0; i<game.state.snakes.length; i++){
            if(game.local.player.id==game.state.snakes[i].id){
                game.state.snakes[i].dir=game.local.player.dir;
            }
        }
    };

    game.showOverlay = function(set){
        if(set){
            document.getElementsByTagName("body")[0].style.cursor = "default";
        }else{
            document.getElementsByTagName("body")[0].style.cursor = "none";
        }
    };

    game.sizeBoard = function(w, h){
        document.getElementById("battlesnake").setAttribute("width",w);
        document.getElementById("battlesnake").setAttribute("height",h);
        game.width = game.quantize(document.getElementById("battlesnake").getAttribute("width"));
        game.height = game.quantize(document.getElementById("battlesnake").getAttribute("height"));
    };

    game.generateFood = function(){
        // Check for food
        for(var i in game.local.food.a){
            if(game.local.food.a[i][0] == game.local.player.x && game.local.food.a[i][1] == game.local.player.y){
                game.snakes.addPoints((game.local.food.a[i][2]+3)*2);
                game.addExplosion(game.local.food.colors[game.local.food.a[i][2]],50+Math.round(Math.random()*60),game.local.food.a[i][0],game.local.food.a[i][1],(game.local.food.a[i][2]+3)*2,15);
                game.local.food.a.splice(i,1);
                break;
            }
        }


        // Generate food
        if(game.local.food.a.length < game.local.food.max && Math.round(Math.random()*35) == Math.round(Math.random()*35)){
            game.local.food.a.push([game.quantize(Math.random()*game.width),game.quantize(Math.random()*game.height),Math.round(Math.random()*4)]);
        }

        // Food glow
        if(game.local.shadow.dir){
            game.local.shadow.val += 0.07;
            if(game.local.shadow.val > 1) game.local.shadow.dir = false;
        }else{
            game.local.shadow.val -= 0.07;
            if(game.local.shadow.val < 0) game.local.shadow.dir = true;
        }


    };

    // Draw food
    game.drawFood = function(){
        for( var i in game.local.food.a){
            game.canvas.shadowColor = game.local.food.colors[game.local.food.a[i][2]];
            game.canvas.shadowBlur = game.local.shadow.val * 18;
            game.canvas.fillStyle = game.local.food.colors[game.local.food.a[i][2]];
            game.canvas.beginPath();
            game.canvas.arc(game.local.food.a[i][0]+game.block/2,game.local.food.a[i][1]+game.block/2, game.block/2, 0, 2 * Math.PI, false);
            game.canvas.fill();
            game.canvas.fillStyle = "#000";
            game.canvas.beginPath();
            game.canvas.arc(game.local.food.a[i][0]+game.block/2,game.local.food.a[i][1]+game.block/2, game.block/3.5, 0, 2 * Math.PI, false);
            game.canvas.fill();
        }

        game.canvas.shadowColor = '#999';
        game.canvas.shadowBlur = 0;
        game.canvas.fill();

    };

    game.checkCollision = function(){
        var collisions = 0;
        //
        for(var i=0; i<game.state.snakes.length; i++){
            for(var i=0; i<game.state.snakes[i].train.length; i++){
                var sn = game.state.snakes[i];
                var pr = game.local.player;
                if(sn.train[i][0] == pr.x && sn.train[i][1] == pr.y){
                    // Player Dies
                    game.local.player = {};
                }
            };

        }
    }

}());
