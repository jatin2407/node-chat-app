const path= require('path');
const express = require('express');
const http = require('http');
const socketIO =require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');

const app = new express();

var publicPath = path.join(__dirname,'../public');
 const port =process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on(('connection') , (socket) => {
  console.log('New user Connected');

  socket.emit('newMessage',generateMessage('Admin' , 'welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user Joined'));

  socket.on('createMessage', (message,callback) => {
    console.log("Message : ", JSON.stringify(message ,undefined ,2));

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This message is from server.');

  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newMessageLocation' , generateLocationMessage('Admin', `${coords.latitude}`, `${coords.longitude}`));
  });


  socket.on(('disconnect') , () => {
    console.log('Disconnected to the server');
  });

});



server.listen(port,() => {
  console.log(`server is up on ${port}`);
});
