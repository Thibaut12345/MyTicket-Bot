const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
   
    if(!args[2]) return message.reply("Please, ask a full question!");
    let replies = ["Yes.", "No", "I dont know.", "Maybe", "Sure!", "Ask again later!", "Meh", "I guess?", "I have no idea.", "well, I think so", "I hope so for you"];
    
    var result = replies[Math.floor(Math.random() * replies.length)];
    let question = args.slice(0).join(" ");
    
    const icon = message.author.displayAvatarURL();
    const ballembed = new discord.MessageEmbed()
    .setTitle(`Asked by ${message.author.username}`)
    .setColor("RANDOM")
    .setThumbnail(icon)
    .addField("Question:", question)
    .addField("Answer:", result)
    .setFooter(`v0.1 | MyTicket | 2Snow#3693`, "https://cdn.discordapp.com/emojis/580593538408906764.gif?v=1");
    
    return message.channel.send(ballembed);
    
    
    
    
}

module.exports.help = {
    name: "8ball"
}