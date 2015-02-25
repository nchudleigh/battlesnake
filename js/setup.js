/*
* @Author: bbales
* @Date:   2015-02-22 20:57:50
* @Last Modified by:   bbales
* @Last Modified time: 2015-02-24 18:51:55
*/

// constants
var P1LOSS = 1;
var P2LOSS = 2;
var UP = 1;
var DOWN = 2;
var LEFT = 3;
var RIGHT = 4;

// Main config
var game = {
    block : 10,
    frameRate : 26,
    flags : {
        gameover : false,
        paused : false,
        tie : false,
        result : undefined,
    },
    keys : {
        w : false,
        s : false,
        a : false,
        d : false,
        up : false,
        down : false,
        left : false,
        right : false,

        fire1 : 0,
        fire2 : 0
    },
    lastkeys : undefined,
    canvas : null,
    food : {
        max : 10,
        superMax : 1,
        a : [],
        b : [],
        colors : ["rgba(255,252,99,1)",
                  "rgba(255,216,99,1)",
                  "rgba(255,176,99,1)",
                  "rgba(255,135,99,1)",
                  "rgba(255,95,99,1)"],
    },
    bullets : {
        a : [],
    },
    explosions : [],
    shadow : {
        dir : true,
        val : 0,
    },

    p1 : {
        // UP DOWN LEFT RIGHT FIRE
        controls : [87,83,65,68,32],
        color: "0,150,255",
        dir : 1,
        x : 200,
        y : 200,
        len : 3,
        train : [],
        wins : 0,
    },

    p2 : {
        controls : [38,40,37,39,13],
        color : "225,80,0",
        dir : 1,
        x : 500,
        y : 200,
        len : 3,
        train : [],
        wins : 0,
    }
};


// websocket stuffs

var ws = new WebSocket('ws://localhost:8080/');
ws.onopen = function() {
    console.log('CONNECT');
};
ws.onclose = function() {
    console.log('DISCONNECT');
};
ws.onmessage = function(event) {
    console.log(event.data);
};

var config = {'iceServers':[
        {"url": "stun:stun.services.mozilla.com"}
    ]
};
var peerConnection = new webkitRTCPeerConnection(config);
console.log(peerConnection)

peerConnection.onicecandidate = function(){
    console.log('onicecandidate', peerConnection)
}







//fuckin scrolls
