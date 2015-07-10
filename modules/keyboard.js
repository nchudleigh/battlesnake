var keyboard = {
    functions : {}
};
var snakes = require('./snakes')

keyboard.functions.readKeyPress = function(dir, player){
    switch (dir) {
        case 'up':
            if(player.dir!=DOWN)player.dir=UP;
            break;
        case 'down':
            if(player.dir!=UP)player.dir=DOWN;
            break;
        case 'left':
            if(player.dir!=RIGHT)player.dir=LEFT;
            break;
        case 'right':
            if(player.dir!=LEFT)player.dir=RIGHT;
            break;
        case 'spawn':
            if(!snakes.functions.alive(player.id)){
                snakes.functions.spawn(player.id);
                io.emit('updateLength', player)
            }
            break;
    }
};


exports.functions = keyboard.functions;
