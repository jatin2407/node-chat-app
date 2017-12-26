var socket = io();

function scrollToBottom() {
  var message = $('#messages');
  var newMessage = message.children('li:last-child');

  var clientHeight = message.prop('clientHeight');
  var scrollTop = message.prop('scrollTop');
  var scrollHeight = message.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
      console.log('sdsds');
      message.scrollTop(scrollHeight);
  }

}


socket.on('connect', function () {
  console.log('connected to server');
});
socket.on('disconnect', function () {
  console.log('disconnected');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template=$('#message-template').html();

  var html=Mustache.render(template,{
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newMessageLocation', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template=$('#location-message-template').html();
  var html=Mustache.render(template,{
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

   $('#messages').append(html);
   scrollToBottom();
});


socket.on('newJoin', function(message) {
  console.log(message);
});

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
