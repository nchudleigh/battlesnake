

var gameStream = {};

// websocket stuffs

var ws = new WebSocket('ws://localhost:8080/');
console.log(ws)

ws.sendMessage = function(type, content){
    type?type:'message';
    content?content:'Nothin';
    var message = {
        type:type,
        content:content
    }
    ws.send(JSON.stringify(message))
}

ws.onopen = function() {
    console.log('CONNECT');
    ws.sendMessage('connect', 'offergoeshere')
};
ws.onclose = function() {
    console.log('DISCONNECT');
};
ws.onmessage = function(event) {
    console.log(event.data);
};

var config = {
    'iceServers':[
        {"url": "stun:stun.services.mozilla.com"}
    ]
};

var peerConnection = new webkitRTCPeerConnection(config);
console.log(peerConnection)


peerConnection.createOffer(
    // success
    function (sessionDescription){
        peerConnection.setLocalDescription(sessionDescription);
    },
    // error
    function(error) {
        alert(error);
    },
    // config
    { 'mandatory':
        { 'OfferToReceiveAudio': false, 'OfferToReceiveVideo': false }
    }
);
