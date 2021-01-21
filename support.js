const discord = require("discord.js");
const fs = require("fs");
 
module.exports.run = async (bot, message, args) => {
    
    var supportEmbed = new discord.MessageEmbed()
    .setTitle("🔮 our support server 🔮")
    .setColor("ff0000")
    .setDescription("Are you requiring immediate assistance from our developers? Feel free to open an ticket in https://discord.io/MyTicket")
    .addField("invite the bot to your server using the link below!", "https://discord.com/oauth2/authorize?client_id=722099589448073317&permissions=8&scope=bot");
    
    return message.channel.send(supportEmbed);
    
 
}
 
module.exports.help = {
    name: "support",
}