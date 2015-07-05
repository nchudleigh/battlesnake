var snakes={
    functions: {}
};

util = require('./util')

snakes.colors=['#42033D','#9A031E','#7C238C','#89023E','#064E86'];

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
    game.state.snakes.push(tmp);
    return tmp.id;
};


snakes.functions.checkFood = function(){
    for(var i=0; i<game.state.snakes.length;i++){
        for(var j=0; j<game.state.food.a.length;j++){
            if(game.state.food.a[j][0] == game.state.snakes[i].x && game.state.food.a[j][1] == game.state.snakes[i].y){
                game.snakes.addPoints((game.state.food.a[j][2]+3)*2);
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
};


exports.functions = snakes.functions;
