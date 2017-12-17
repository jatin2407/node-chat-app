var socket = io();
socket.on('connect', function () {
  console.log('connected to server');
  socket.emit('createMessage' , {
    to : "Jaitn@bkjfcagsb.com",
    text : "ahsfhadjkfhkafk"
  });
});
socket.on('disconnect', function () {
  console.log('disconnected');
});

socket.on('newMessage', function(message) {
  console.log("new emit event",message);
});
