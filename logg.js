const Discord = require("discord.js");
const fs = require("fs");
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://sqlite.db');
keyv.on('error', err => console.log('Connection Error', err));

module.exports.run = async (bot, message, args) => {
  
 
  
  let kanaal = message.channel.id;
  let server = message.guild.id;
  await keyv.set(server, kanaal);
  
  
  let sEmbed = new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setTitle("logchannel set!")
  .setDescription(`successfully channeled to receive logs!`);
  
  message.channel.send(sEmbed);
  

}

module.exports.help = {
    name: "setlogchannel"
}