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
        for(var i in game.food.a){
            if(game.food.a[i][0] == game.p1.x && game.food.a[i][1] == game.p1.y){
                game.snakes.addPoints('player',(game.food.a[i][2]+3)*2);
                game.addExplosion(game.food.colors[game.food.a[i][2]],50+Math.round(Math.random()*60),game.food.a[i][0],game.food.a[i][1],(game.food.a[i][2]+3)*2,15);
                game.food.a.splice(i,1);
                break;
            }
        }


        // Generate food
        if(game.food.a.length < game.food.max && Math.round(Math.random()*35) == Math.round(Math.random()*35)){
            game.food.a.push([game.quantize(Math.random()*game.width),game.quantize(Math.random()*game.height),Math.round(Math.random()*4)]);
        }

        // Food glow
        if(game.shadow.dir){
            game.shadow.val += 0.07;
            if(game.shadow.val > 1) game.shadow.dir = false;
        }else{
            game.shadow.val -= 0.07;
            if(game.shadow.val < 0) game.shadow.dir = true;
        }

        // Draw food
        for(i in game.food.a){
            game.canvas.shadowColor = game.food.colors[game.food.a[i][2]];
            game.canvas.shadowBlur = game.shadow.val * 18;
            game.canvas.fillStyle = game.food.colors[game.food.a[i][2]];
            game.canvas.beginPath();
            game.canvas.arc(game.food.a[i][0]+game.block/2,game.food.a[i][1]+game.block/2, game.block/2, 0, 2 * Math.PI, false);
            game.canvas.fill();
            game.canvas.fillStyle = "#000";
            game.canvas.beginPath();
            game.canvas.arc(game.food.a[i][0]+game.block/2,game.food.a[i][1]+game.block/2, game.block/3.5, 0, 2 * Math.PI, false);
            game.canvas.fill();
        }

        game.canvas.shadowColor = '#999';
        game.canvas.shadowBlur = 0;
        game.canvas.fill();

        game.generateSuperFood();
    };


    game.generateSuperFood = function(){
        // Check for food
        var points = 15;
        for(var i in game.food.b){
            if(game.food.b[i][0] == game.p1.x && game.food.b[i][1] == game.p1.y){
                game.snakes.addPoints('player',points);
                game.addExplosion("#46FF00",50+Math.round(Math.random()*60),game.food.b[i][0],game.food.b[i][1],points,20);
                game.food.b.splice(i,1);
                break;
            }
        }

        // Generate food
        if(game.food.b.length < game.food.superMax && Math.round(Math.random()*20) == Math.round(Math.random()*20)){
            game.food.b.push([game.quantize(Math.random()*game.width),game.quantize(Math.random()*game.height),Math.round(Math.random()*4)]);
        }

        // Food glow
        if(game.shadow.dir){
            game.shadow.val += 0.07;
            if(game.shadow.val > 1) game.shadow.dir = false;
        }else{
            game.shadow.val -= 0.07;
            if(game.shadow.val < 0) game.shadow.dir = true;
        }

        // Draw food
        for(i in game.food.b){
            game.canvas.shadowColor = "#FFFF00";
            game.canvas.shadowBlur = Math.sin(2*game.shadow.val) * 35;
            game.canvas.fillStyle = "#00FF05";
            game.canvas.beginPath();
            game.canvas.arc(game.food.b[i][0]+game.block/2,game.food.b[i][1]+game.block/2, game.block/2, 0, 2 * Math.PI, false);
            game.canvas.fill();
            game.canvas.fillStyle = "#F7FF45";
            game.canvas.beginPath();
            game.canvas.arc(game.food.b[i][0]+game.block/2,game.food.b[i][1]+game.block/2, game.block/4, 0, 2 * Math.PI, false);
            game.canvas.fill();
        }

        game.canvas.shadowColor = '#999';
        game.canvas.shadowBlur = 0;
        game.canvas.fill();
    };

    window.addEventListener("resize",function(){
        document.getElementById("battlesnake").setAttribute("width",document.getElementById("battlesnake").offsetWidth);
        document.getElementById("battlesnake").setAttribute("height",document.getElementById("battlesnake").offsetHeight);
        game.width = Math.round(document.getElementById("battlesnake").getAttribute("width")/10)*10;
        game.height = Math.round(document.getElementById("battlesnake").getAttribute("height")/10)*10;
    },false);

    window.onscroll = function () { window.scrollTo(0, 0); return false;};
}());
