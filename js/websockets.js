

// initialize webSocket and webRTC objects
var ws = new WebSocket('ws://localhost:8080/');

var config = {
    'iceServers':[
        {"url": "stun:stun.services.mozilla.com"}
    ]
};

var peerConnection = new webkitRTCPeerConnection(config);



// send a message to the socket
ws.sendMessage = function(type, content){
    type?type:'message';
    content?content:'';
    var message = {
        'type':type,
        'content':content
    }
    ws.send(JSON.stringify(message))
}
// fires after connection establish
ws.onopen = function() {
    console.log('CONNECT');
};
// fires on connection close
ws.onclose = function() {
    console.log('DISCONNECT');
};
// fires when message recieved
ws.onmessage = function(event) {
    message = JSON.parse(event.data);
    if(message.type == 'offer'){
        createAnswer(message);
    }

};

var createAnswer = function(message){
    // This sets you as the remote peer
    peerConnection.setRemoteDescription(new RTCSessionDescription(message));
    // create an answer to the offer
    peerConnection.createAnswer(
        function (sessionDescription){
            peerConnection.setLocalDescription(sessionDescription);
        },
        // success
        function(){
            // send answer back to offerer
            answer = {
                'sdp':sessionDescription.sdp,
                'type':sessionDescription.type
            }
            ws.sendMessage('answer', answer)
        },
        // error
        function(error){
            alert(error);
        },
        // config
        { 'mandatory':
            { 'OfferToReceiveAudio': false, 'OfferToReceiveVideo': false }
        }
    );
}


peerConnection.createOffer(
    // success
    function (sessionDescription){
        peerConnection.setLocalDescription(sessionDescription);
        offer = {
            'sdp':sessionDescription.sdp,
            'type':sessionDescription.type
        }
        ws.sendMessage('offer', offer)
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
