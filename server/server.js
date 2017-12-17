const path= require('path');
const express = require('express');
const http = require('http');
const socketIO =require('socket.io');

const app = new express();

var publicPath = path.join(__dirname,'../public');
 const port =process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on(('connection') , (socket) => {
  console.log('New user Connected');

  socket.on(('disconnect') , () => {
    console.log('Disconnected to the server');
  });

  socket.on('createMessage', (message) => {
    console.log("Message : ", JSON.stringify(message ,undefined ,2));
  })

  socket.emit('newMessage', {
    from: "jatin@gmail.com",
    createdAt: "jatin1324",
    text: "my first email"
  });
});



server.listen(port,() => {
  console.log(`server is up on ${port}`);
});
