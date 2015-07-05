/*
* @Author: bbales
* @Date:   2015-02-22 20:57:50
* @Last Modified by:   bbales
* @Last Modified time: 2015-02-24 18:51:55
*/

// constants
var UP = 1;
var DOWN = 2;
var LEFT = 3;
var RIGHT = 4;

// Main config
var game = {
    block : 10,
    frameRate : 26,
    maxLen : 25,
    local:{
        player:{},
        controls:{
            up:[87,38],
            down:[83,40],
            left:[65,37],
            right:[68,39],
            fire:[70,32]
        },
        keys : {
            up : false,
            down : false,
            left : false,
            right : false,
            fire : 0
        },
        lastkeys : undefined,
        canvas : null,
        explosions : []
    },
    config : {
        food:{
            colors : [
                "rgba(255,252,99,1)",
                "rgba(255,216,99,1)",
                "rgba(255,176,99,1)",
                "rgba(255,135,99,1)",
                "rgba(255,95,99,1)"
            ]
        },
        shadow : {
            dir : true,
            val : 0,
        },
    },
    state:{}
};
