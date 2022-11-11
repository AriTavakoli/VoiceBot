const path = require('path');

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
var fs = require('fs');

var SpotifyWebApi = require('spotify-web-api-node');

const token = 'AQBWefu5mHETEfIJHeaV9ZRLHMtYpHKC8W5uaRwB6sWaXcCChKdCx6enqBPBPma090dYfJtnZ4qINo9XOTLSZXVUCAtlrZ-vwG8ggMI4pssDYONZWz3CW4_62Ed4fcDZ90Ygtt-lYKfbRAh3li8TE0SjI5JjX2gQZIidzwd5olKkagu9xljtmNoWxwalGIDA1bamyhNBij127cGVOc2JslEvpMhHCU1Xcqc4V0TqFE2EV1al_m5nGeUwzHW97cNgP1ZZswOp-D6U-e8sDDTcbfsFEcKP-QmwPJNHDxrQNFXMM2CKbdT4vcO7bmZuKtkvTn-BEe5Z805gULCrTOmJhoUnbbI_htLpv65bfTxc8MFr80Im198vcMA_7v-XlLgtKZBqp87xbfqMyfieMtnyTWwTNkkosdBGP6iTGFIrvWMwWUUYdaRrTHywf5mZleBlB1NBOPmFwCvq5Djf5-Ll7GKhEtF176jkpxW2h5fKKmXilK3IYaVxmsoDOZtDt4TuPZCIez71m7Rd7rEKavzYy-FkBmuXr0VRcodge-Oi25AIkH9-nNdSEu3rbWToZmt9zfvyNTfyTetZnh3FMm3EohXw3hVOw7eJYmiQgw9lY8rbAhuZf_aa3tsCCRZOZF0gEqS4vW0RE950qM6CY7rQU3i0p7psIXCWby3UdOVM7bG8uYwgIpAnPdjM5TC7Ta9Kb4HX6yCZw98u9sV77rFVNyBN4YZspA';

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify',
];

var spotifyApi = new SpotifyWebApi({
  clientId: '4d15ae5216a842deba5472e381d591c0',
  clientSecret: '9b601f9f194c4617b917cb2091607972',
  redirectUri: 'http://localhost:3500/callback',
});


app.get('/login', function (req, res) {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});


const { Client, Intents, MessageAttachment, WebhookClient, Collection, GatewayIntentBits, EmbedBuilder, PremissionBitField, Premission } = require('discord.js');


const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1037888152884490260/R836TwCs2ewLQUlQKVXVRuRw5Yh2NpDaHhHiuyI32jkEcLs5cKAlXLsTQ9R2kGXrbAZ5' });

var sendWebhook = function (message) {

  const embed = new EmbedBuilder()
    .setTitle(message)
    .setColor(0x800080);

    // purple = 0x800080

    // purple hex color code


  webhookClient.send({
    content: 'Webhook test',
    username: 'some-username',
    embeds: [embed],
  });


};


const AUTHORIZE = "https://accounts.spotify.com/authorize";





const server = http.createServer(app);

const io = socketio(server);

var pr = function () {
  console.log('pr');
}

var execute = false;
// set static folder

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
    io.emit('on', 'execute');


  });
  app.post('/deactivate', (req, res) => {
    // get post message

    console.log('post message received');
    io.emit('off', 'execute');


  });

  app.get('/callback', function (req, res) {
    const code = req.query.code;
    const state = req.query.state;
    const error = req.query.error;

    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }

    spotifyApi.authorizationCodeGrant(code).then( data=> {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];


        console.log(access_token);


        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);



        console.log('access_token', access_token);

        res.send('Success! You can now close the window.');
      });


  });

// !

  socket.on('transcript', msg => {

   // sendWebhook(msg);

  });




});


const PORT = process.env.PORT || 3500;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
