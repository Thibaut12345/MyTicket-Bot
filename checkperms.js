const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    
if(message.member.hasPermission('MANAGE_GUILD')) {
    
    const roles = message.member.roles.cache.sort((a, b) => b.position).map(role => role.toString());
    var permsembed = new discord.MessageEmbed()
    .setTitle("permissions scanned!")
    .setColor("#ff0000")
    .setDescription("it looks like you have enough permissions to modify the bot! ✅")
    .addField(`your roles [${roles.length}]`, roles.join(' '));

    return message.channel.send(permsembed);
    
};

if(!message.member.hasPermission('MANAGE_GUILD')) {
    
    const roles = message.member.roles.cache.sort((a, b) => b.position).map(role => role.toString());
    var perms2embed = new discord.MessageEmbed()
    .setTitle("permissions scanned!")
    .setColor("#ff0000")
    .setDescription("it looks like you `don't` have enough permissions to modify the bot! ❌")
    .addField(`your roles [${roles.length}]`, roles.join(' '));

    return message.channel.send(perms2embed);
}
 
}
 
module.exports.help = {
    name: "checkperms",
    description: "kijk of je perms hebt om de bot aan te passen!"
}