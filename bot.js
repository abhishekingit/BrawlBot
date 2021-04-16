const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const mongoose = require("mongoose");
const path = require('path');
const {prefix, token, mongoURL} = require("./config.json");

const client = new Commando.Client({
    owner: '605650569536995328',
    commandPrefix: prefix
});

mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false})
.then(result => {
  console.log("DB connected");
    
}).catch(err => {
  console.log(err);
});

client.once("ready", () => {
    console.log("Bot is live!");
    client.user.setActivity(`on ${client.guilds.cache.size} servers`);
        
});
 
client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});

client.registry.registerGroups([
    ['brawlstars', 'Brawl-Stars Related Functions'],
    ['moderation', 'Moderation Commands'],
    ['owner', 'Owner-only functions']
]).registerDefaults()
.registerCommandsIn(path.join(__dirname, 'commands'));


 
client.login(token);