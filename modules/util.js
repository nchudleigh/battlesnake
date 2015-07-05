var util = {
    functions:{}
};

game = require('./game')

util.functions.randomDir = function(){
    return Math.round(Math.random()*3)+1;
};

util.functions.randomColor = function(colors){
    var i = Math.round(Math.random()*(colors.length-1));
    return colors[i];
};

util.functions.randomRange = function(min, max){
    return Math.random()*(max-min) + min;
};

util.functions.randomLocation = function(){
    var fg = Math.floor(util.functions.randomRange(50, game.config.width/2));
    fg = fg-fg%10;
    return fg
};

util.functions.quantize = function(int){
    return Math.round(int/10)*10;
};


util.functions.foodInterval = function(){
    return (Math.round(Math.random()*game.config.food.interval) == Math.round(Math.random()*game.config.food.interval));
};

util.functions.generateFood = function(){
    // Generate food
    if(game.state.food.a.length < game.config.food.max && util.functions.foodInterval()){
        game.state.food.a.push([util.functions.quantize(Math.random()*game.config.width),util.functions.quantize(Math.random()*game.config.height),Math.round(Math.random()*4)]);
    }
};

util.functions.checkCollision = function(){
    var collisions = 0;
    //
    for(var i=0; i<game.state.snakes.length; i++){
        for(var i=0; i<game.state.snakes[i].train.length; i++){
            var sn = game.state.snakes[i];
            if(sn.train[i][0] == pr.x && sn.train[i][1] == pr.y){
                // This needs to be figured out
            }
        };
    }
};
exports.functions = util.functions;
