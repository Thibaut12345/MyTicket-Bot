const discord = require("discord.js");
let cooldown = new Set();

module.exports.run = async (bot, message, args) => {
    
    let cdseconds = 300;
    
    if(cooldown.has(message.channel.id)) {
        message.delete();
        return message.channel.send("due to discord terms I can only edit channels 2 times per 10 minutes! please wait 5 min!")
    } else {
    
    cooldown.add(message.channel.id);

    
    if(!args[0]) return message.channel.send("Please give a new name! Usage: !rename <new name>");
    if(args[1]) return message.channel.send("the name must be written without a space! Usage: !rename <new name>");
    message.channel.setName(args[0]);
    
    var newEmbed = new discord.MessageEmbed()
    .setTitle("Name changed!")
    .setDescription(`successfuly changed the name from **${message.channel.name}** to **${args[0]}**`)
    .setFooter("Name changed");
    
    message.channel.send(newEmbed);
    
    setTimeout(() => {
        cooldown.delete(message.channel.id)
        message.reply("Your cooldown has ended!")
    }, cdseconds * 1000)
    
    
}
    

    

    
    
}

module.exports.help = {
    name: "rename"
}