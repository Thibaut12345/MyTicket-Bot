const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    
    let ticketrole = JSON.parse(fs.readFileSync("./setrole.json", "utf-8"));

     if(!ticketrole[message.guild.id]) {
     return;
     }
     let ticketroleSend = ticketrole[message.guild.id].ticketrole;

     let ticketroleSenda = message.guild.roles.cache.find(c => c.id === ticketroleSend);
     
     
     let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
    if (!ticketowners[message.channel.id]) {
        return message.channel.send("Please do this command in a ticket channel!");
    }
    let ticketowner = ticketowners[message.channel.id].ticketowners;
     
     const user = message.guild.members.cache.get(ticketowner);
     
     const infoEmbed = new discord.MessageEmbed()
    .setTitle("📁 | Info")
    .setDescription("See here the information about this ticket!")
    .setColor("ff0000")
    .addField("Support Role:", ticketroleSenda, true)
    .addField("Ticket Owner:", user, true)
    .addField("Ticket ID:", message.channel.id, true)
    .addField("Channel Name:", message.channel.name, true)
    .addField("Channel Name:", `${moment(message.channel.createdTimestanp).format('LT')} ${moment(message.channel.createdTimestanp).format('LL')} ${moment(message.channel.createdTimestanp).fromNow()}`, true)
    .setFooter("v0.1 | MyTicket | 2Snow#3693", "https://cdn.discordapp.com/emojis/739621692208578581.gif?v=1");
    
    return message.channel.send(infoEmbed);
    
    
}

module.exports.help = {
    name: "info"
}