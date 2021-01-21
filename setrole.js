const Discord = require("discord.js");
const fs = require("fs");
const Keyv = require('keyv');

const keyv = new Keyv('sqlite://sqlite.db');
keyv.on('error', err => console.log('Connection Error', err));


module.exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**OOPS!** you cannot change the ticket role!");
  
  let role = message.guild.roles.cache.find(r => r.name === args.join(" ")) || message.guild.roles.cache.find(r => r.id === args.join(" ")) || message.mentions.roles.first();
  if (!role) return message.channel.send("**OOPS!** can't find that role!")
  
  let server = message.guild.id;
  await keyv.set(server, role.id);
  
  
  let sEmbed = new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setTitle("new role successfully set!")
  .addField("new role:", role, true)
  .addField("changed by:", message.author, true);
  
  message.channel.send(sEmbed);
  

}

module.exports.help = {
    name: "setrole"
}