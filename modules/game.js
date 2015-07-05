// Main config
exports.state = {
    food: {
        a : [],
        b : []
    },
    snakes : [],
    bullets : {
        a : [],
    }
};
exports.config = {
    block:10,
    frameRate: 25,
    maxLength : 25,
    width : 750,
    height : 750,
    UP : 1,
    DOWN : 2,
    LEFT : 3,
    RIGHT : 4,
    food : {
        interval : 35,
        max : 10,
        superMax: 1
    }
}

global.UP = 1;
global.DOWN = 2;
global.LEFT = 3;
global.RIGHT = 4;
