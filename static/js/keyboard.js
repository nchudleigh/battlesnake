(function(){
    'use strict';
    // This needvs to be moved to server side
    game.controls = function(){
        // Put this frame's keys into temporary object to prevent changes in the frame
        var tempKeys = game.local.keys;

        if(tempKeys.up){
            if(game.local.player.dir!=DOWN)game.local.player.dir=UP;
        }
        else if(tempKeys.down){
            if(game.local.player.dir!=UP)game.local.player.dir=DOWN;
        }
        else if(tempKeys.left){
            if(game.local.player.dir!=RIGHT)game.local.player.dir=LEFT;
        }
        else if(tempKeys.right){
            if(game.local.player.dir!=LEFT)game.local.player.dir=RIGHT;
        }

        // Set last keys
        game.local.lastkeys = tempKeys;


        // Bullets
        if(tempKeys.fire === 1 && game.local.player.bullets > 0){
            game.bullets.addBullet();
            game.keys.fire = 2;
        }

    };

    function checkKey(dir, num){
        if(dir=='fire'){
            if(game.local.keys.fire===0)game.local.keys.fire = 1;
            else if(game.local.keys.fire===1)game.local.keys.fire = 1;
            return true;
        }
        if(game.local.controls[dir].indexOf(num) != -1){
            game.local.keys[dir]=true;
            game.socket.emit('keyPress',dir);
            return true;
        }
        else{
            game.local.keys[dir]=false;
            return false;
        }
    };

    function getKeyDown(e){
        checkKey('up', e.which);
        checkKey('down', e.which);
        checkKey('left', e.which);
        checkKey('right', e.which);
        checkKey('spawn', e.which);
        checkKey('fire', e.which);
    };

    function getKeyUp(e){
        checkKey('fire', e.which);
    };

    window.addEventListener("keydown",getKeyDown,false);
    window.addEventListener("keyup",getKeyUp,false);

}());
