var snakes={
    functions: {}
};

util = require('./util')

snakes.colors=['rgba(0, 210, 2, 1)','rgba(203, 0, 36, 1)','rgba(149, 0, 240, 1)','rgba(218, 0, 209, 1)','rgba(0, 131, 233, 1)'];

snakes.functions.randomId = function(){
    function s4(){
        return Math.floor((1+Math.random())* 0x10000)
        .toString(16);
    }
    return s4()+s4()+s4()+s4();
};

// returns new player
snakes.functions.generate = function(){
    var player = {
            id: snakes.functions.randomId(),
            color: util.functions.randomColor(snakes.colors), // This will  need to randomize or be a special color for the client and
            dir : util.functions.randomDir(), // randomize
            x : util.functions.randomLocation(), // randomize based on board
            y : util.functions.randomLocation(), // randomize based on board
            len : 3,
            train : [],
            kills : 0,
            deaths : 0
    };
    return player;
};

snakes.functions.spawn = function(){
    var tmp = snakes.functions.generate();
    var len = game.state.snakes.push(tmp);
    return game.state.snakes[len-1];
};


snakes.functions.addPoints = function(snake, points){
    snake.len += points;
}



snakes.functions.checkFood = function(){
    for(var i=0; i<game.state.snakes.length;i++){
        for(var j=0; j<game.state.food.a.length;j++){
            if(game.state.food.a[j][0] == game.state.snakes[i].x && game.state.food.a[j][1] == game.state.snakes[i].y){
                snakes.functions.addPoints(game.state.snakes[i],(game.state.food.a[j][2]));
                game.state.food.a.splice(j,1);
                break;
            }
        }
    }
}

snakes.functions.moveAll = function(){
    for(var sn=0; sn<game.state.snakes.length; sn++){
        snakes.functions.move(game.state.snakes[sn]);
    }
};

snakes.functions.move = function(sn){
    switch(sn.dir){
        case game.config.UP:
            sn.y -= game.config.block;
            break;
        case game.config.DOWN:
            sn.y += game.config.block;
            break;
        case game.config.LEFT:
            sn.x -= game.config.block;
            break;
        case game.config.RIGHT:
            sn.x += game.config.block;
            break;
    }

    // Edge detection
    if(sn.x < 0) sn.x = game.config.width-game.config.block;
    else if(sn.x >= game.config.width-game.config.block) sn.x = 0;
    if(sn.y < 0) sn.y = game.config.height - game.config.block;
    else if(sn.y > game.config.height - game.config.block) sn.y = 0;

    if(sn.train.length >= sn.len) sn.train.pop();
        sn.train.unshift([sn.x,sn.y]);
};

snakes.functions.checkCollions = function(py, pr){
    var prey = game.state.snakes[py];
    var predator = game.state.snakes[pr];
    if(prey==undefined || predator==undefined)return;
    for(var i=0; i<predator.train.length; i++){
        if(predator.train[i][0] == prey.x && predator.train[i][1] == prey.y){
            // Player Dies
            game.state.snakes.splice(py, 1);
            console.log('COLLISSION');
        }
    };
};

snakes.functions.checkAllCollisions = function(){
    for(var i=0; i<game.state.snakes.length; i++){
        for(var j=0; j<game.state.snakes.length; j++){
            if(i!=j)snakes.functions.checkCollions(i,j)
        }
    }
}


exports.functions = snakes.functions;
