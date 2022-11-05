const path = require('path');

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
var fs = require('fs');




const { Client, Intents, MessageAttachment, WebhookClient, Collection, GatewayIntentBits, EmbedBuilder, PremissionBitField, Premission } = require('discord.js');


const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1037888152884490260/R836TwCs2ewLQUlQKVXVRuRw5Yh2NpDaHhHiuyI32jkEcLs5cKAlXLsTQ9R2kGXrbAZ5' });

var sendWebhook = function () {



  const embed = new EmbedBuilder()
    .setTitle('sdsd')
    .setColor(0x00FFFF);



  webhookClient.send({
    content: 'Webhook test',
    username: 'some-username',
    embeds: [embed],
  });


};

const app = express();

const server = http.createServer(app);

const io = socketio(server);

var pr = function () {
  console.log('pr');
}

var execute = false;
// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// app post request to send message to discord



// run when client connects


io.on('connection', socket => {
  console.log('New WS Connection...');
  socket.emit('message', 'Welcome to ChatCord!');


  socket.broadcast.emit('message', 'A user has joined the chat');
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    io.emit('message', msg);
  });

  socket.on('message', msg => {
    io.emit('message', msg);
  });

  app.post('/activate', (req, res) => {
    // get post message

    console.log('post message received');
    io.emit('run', 'execute');


  });

  if(execute) {

    console.log('execute');

  }



  // welcome current use
});


const PORT = process.env.PORT || 3500;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
