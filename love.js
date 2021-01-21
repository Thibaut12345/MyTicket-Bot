const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let replies = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%", "2%", "8%", "26%", "51%", "73%", "87%", "99%", "87%", "0%", "16%", "29%", "85%", "93%", "41%"];
    
    var result = replies[Math.floor(Math.random() * replies.length)];
    
    let user1 = args[0];
    let user2 = args[1];
    
    if(!user2) user1 = message.author;
    if(!user2) user2 = args[0];
    
    var loveembed = new discord.MessageEmbed()
    .setTitle("love check!")
    .setColor("#ff0000")
    .setDescription(`**${user1}** and **${user2}** fit together for **${result}**!`);
    
    return message.channel.send(loveembed);
    
    
    
    
}

module.exports.help = {
    name: "lovecheck"
}