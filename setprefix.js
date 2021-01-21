const discord = require("discord.js");
const fs = require("fs");
 
module.exports.run = async (bot, message, args) => {
    
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**OOPS!** You can't change the prefix!");
    if(!args[0] || args[0 == "help"]) return message.channel.send("Please use, **!setprefix <desired prefix here>");
    
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    
    prefixes[message.guild.id] = {
        prefixes: args[0]
    };
    
    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });
    
    var setprefixEmbed = new discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("New prefix set!")
    .setDescription(`New prefix successfuly set to: **${args[0]}**`)
    .setFooter("bot made by 2Snow#3693");
    
    message.channel.send(setprefixEmbed)
 
    
 
}
 
module.exports.help = {
    name: "setprefix",
    description: "voeg een custom prefix toe!"
}