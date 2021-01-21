const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**OOPS!** you cannot change the ticket role!");
  
   const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!user) return message.channel.send("**OOPS!** can't find that user! make sure you provide the user's id! usage: !adduser <userid>")
  
  var userName = message.author.username;
  
  let sEmbed = new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setTitle("user successfully removed!")
  .addField("removed user:", user, true)
  .addField("removed by:", message.author, true);
  
            // Maak kanaal en zet in juiste categorie.
    message.channel.send(sEmbed).then((channel) => { // Maak kanaal
 
            // Zet perms voor iedereen
            message.channel.updateOverwrite(user, {
  VIEW_CHANNEL: false,
  SEND_MESSAGES: false
});
    });
  

}

module.exports.help = {
    name: "removeuser"
}