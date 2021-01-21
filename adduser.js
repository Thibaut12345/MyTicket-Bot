const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**OOPS!** you cannot change the ticket role!");
  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!user) return message.channel.send("**OOPS!** can't find that user! make sure you provide the user's id! usage: !adduser <userid>")
  var userName = message.author.username;
  
  const icon = user.user.displayAvatarURL()
  let sEmbed = new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setThumbnail(icon)
  .setTitle(`:gear: | User successfully added!`)
  .addField("Added User:", user)
  .addField("Added By:", message.author)
  .setFooter(`v0.1 | MyTicket | 2Snow#3693`, "https://cdn.discordapp.com/emojis/722436746352132199.png?v=1");
  
            // Maak kanaal en zet in juiste categorie.
            message.channel.send(sEmbed).then((channel) => { // Maak kanaal
 
            // Zet perms voor iedereen
            message.channel.updateOverwrite(user, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
            });
            });
  

}

module.exports.help = {
    name: "adduser"
}