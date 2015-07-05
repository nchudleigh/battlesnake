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
    maxLen : 25,
    width : 550,
    height : 550,
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
