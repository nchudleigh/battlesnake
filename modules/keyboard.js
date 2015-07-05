var keyboard = {
    functions : {}
};

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
    }
};


exports.functions = keyboard.functions;
