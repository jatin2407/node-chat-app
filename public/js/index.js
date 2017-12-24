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

socket.on('newMessageLocation', function(message) {
  console.log("new Location url",message);
   var li = $('<li></li>');
   var a = $('<a target="_blank">My current Location</a>');
   li.text(`${message.from} :`);
   a.attr('href',message.url);
   li.append(a);
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

  var messageTextbox =$('#message');
  socket.emit('createMessage', {
    from : 'Jatin',
    text : messageTextbox.val()
  },function(){
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    alert('unable to access geolocation for your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending Location....');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    console.log(position);
    socket.emit('createLocationMessage' , {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fecth loaction');
  });
});
