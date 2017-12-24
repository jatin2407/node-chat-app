var socket = io();
socket.on('connect', function () {
  console.log('connected to server');
});
socket.on('disconnect', function () {
  console.log('disconnected');
});

socket.on('newMessage', function(message) {
  console.log("new emit event",message);
   var li = $('<li></li>');
   li.text(`${message.from} : ${message.text}`);
   $('#messages').append(li);
});

socket.on('newJoin', function(message) {
  console.log(message);
});

// socket.emit('createMessage',{
//     from: "Mukesh",
//     text: "Hi Patel"
// },function(data){
//   console.log(`${data}`);
// });

$('#message-form').on('submit',function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from : 'Jatin',
    text : $('#message').val()
  },function(){

  });
});
