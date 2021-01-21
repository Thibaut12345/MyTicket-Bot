const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**OOPS!** you cannot change that!");
  if(!args.join(' ')) return message.channel.send("Please use: !setopenreason on/off");
  if (args[0] !== "on"  && args[0] !== "off") return message.channel.send("oops! use on/off");
  let setopenreason = JSON.parse(fs.readFileSync("./setopenreason.json", "utf8" ));
  
  setopenreason[message.guild.id] = {
      setopenreason: args.join(' ')
  };
  
  fs.writeFile("./setopenreason.json", JSON.stringify(setopenreason), (err) => {
      if (err) console.log(err)
  });
  
  let sEmbed = new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setTitle(`reasons set to ${args.join(' ')}`)
  .addField("changed by:", message.author, true);
  
  message.channel.send(sEmbed);
  

}

module.exports.help = {
    name: "setopenreason"
}