/*
* @Author: bbales
* @Date:   2015-02-23 11:40:08
* @Last Modified by:   bbales
* @Last Modified time: 2015-02-24 20:26:08
*/
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

    game.showOverlay = function(set){
        if(set){
            document.getElementsByTagName("body")[0].style.cursor = "default";
        }else{
            document.getElementsByTagName("body")[0].style.cursor = "none";
        }
    };

    game.sizeBoard = function(w, h){
        document.getElementById("gameboard").setAttribute("width",w);
        document.getElementById("gameboard").setAttribute("height",h);
        document.getElementById("battlesnake").setAttribute("width",w);
        document.getElementById("battlesnake").setAttribute("height",h);
        game.width = game.quantize(document.getElementById("battlesnake").getAttribute("width"));
        game.height = game.quantize(document.getElementById("battlesnake").getAttribute("height"));
    };

    // Draw food
    game.drawFood = function(){
        for( var i in game.state.food.a){
            game.canvas.shadowColor = game.config.food.colors[game.state.food.a[i][2]];
            game.canvas.shadowBlur = game.config.shadow.val * 18;
            game.canvas.fillStyle = game.config.food.colors[game.state.food.a[i][2]];
            game.canvas.beginPath();
            game.canvas.arc(game.state.food.a[i][0]+game.block/2,game.state.food.a[i][1]+game.block/2, game.block/2, 0, 2 * Math.PI, false);
            game.canvas.fill();
            game.canvas.fillStyle = "#000";
            game.canvas.beginPath();
            game.canvas.arc(game.state.food.a[i][0]+game.block/2,game.state.food.a[i][1]+game.block/2, game.block/3.5, 0, 2 * Math.PI, false);
            game.canvas.fill();
        }

        game.canvas.shadowColor = '#999';
        game.canvas.shadowBlur = 0;
        game.canvas.fill();

        // Food glow
        if(game.config.shadow.dir){
            game.config.shadow.val += 0.07;
            if(game.config.shadow.val > 1) game.config.shadow.dir = false;
        }else{
            game.config.shadow.val -= 0.07;
            if(game.config.shadow.val < 0) game.config.shadow.dir = true;
        }

    };


}());
