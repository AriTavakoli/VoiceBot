const axios = require('axios');
require('dotenv').config();
const { Client, joinVoiceChannel, Intents, MessageAttachment, WebhookClient, Collection, GatewayIntentBits, EmbedBuilder, PremissionBitField, Premission } = require('discord.js');
const fs = require('fs');
const Discord = require('discord.js');





const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1037888152884490260/R836TwCs2ewLQUlQKVXVRuRw5Yh2NpDaHhHiuyI32jkEcLs5cKAlXLsTQ9R2kGXrbAZ5' });


var sendWebhook = function () {

  const embed = new EmbedBuilder()
    .setTitle('Some Title')
    .setColor(0x00FFFF);

  webhookClient.send({
    content: 'Webhook test',
    username: 'some-username',
    embeds: [embed],
  });


};

//const { entersState, joinVoiceChannel, VoiceConnectionStatus, EndBehaviorType } = require('@discordjs/voice');


const client = new Client({
  intents:
    [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences
    ]


});


client.login(process.env.BOT_TOKEN);


//const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async (message) => {
  if (message.content === "ping") {


  }
});


async function nasa() {
  const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=iIjIJG0PIaq2fk4UX4VzA7L8VF0dvA0BsbefQaJ7');
  console.log(response.data);

  const embed = new EmbedBuilder()
    .setTitle(response.data.title)
    .setThumbnail(response.data.url)
    .setImage(response.data.url)

  return embed;
}

const sendMessage = async (message) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: message })
  };
  fetch('http://localhost:4200/postMessage', requestOptions).then(response => response.json())
    .then(console.log(message));
};

const sendMessage1 = async (message) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Activate Recording' })
  };
  fetch('http://localhost:4200/activate', requestOptions);
};


const sendMessageAxios = async () => {
  const res = await axios.post('http://localhost:3500/activate', {
    answer: 42
  });
};





client.on("voiceStateUpdate", (oldState, newState) => {
  // Do anything here with the updated state.
  // if user is deafen or muted
  if (newState.selfDeaf) {

    sendMessageAxios()

  }
  if (!newState.selfDeaf) {
    console.log("user undefed ");
  }


});


// write a function that listens for voice channel leave
// write a function that listens for voice channel message
// write a function that listens for voice channel message delete
// write a function that listens for voice channel message update
// write a function that listens for voice channel message reaction add







async function api() {
  const response = await axios.get('http://localhost:5000/yes');
  console.log(response.data);
  return response.data;

}

var join = false;

client.on('messageCreate', async (message) => {
  if (message.content === 'join') {
    if (message.member.voice.channel) {
      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      try {
        await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
        join = true;

      } catch (error) {
        connection.destroy();
        throw error;
      }

      const receiver = connection.receiver;
      const user = message.author;
      const userId = user.id;


    }
  }

});



exports.sendWebhook = sendWebhook;
exports.client = client;
exports.join = join;
exports.api = api;
exports.nasa = nasa;
