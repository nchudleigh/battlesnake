var socket = io.connect('')

socket.on('connect', function(data){
    console.log('connected', data)
})
