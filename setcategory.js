const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**OOPS!** you cannot change the ticket category!");
  
  let category = message.guild.channels.cache.find(cat => cat.name === args.join());
  if (!category) return message.channel.send("**OOPS!** can't find that category!")
  let ticketcategory = JSON.parse(fs.readFileSync("./ticketcategory.json", "utf8" ));
  
  ticketcategory[message.guild.id] = {
      ticketcategory: category.id
  };
  
  fs.writeFile("./ticketcategory.json", JSON.stringify(ticketcategory), (err) => {
      if (err) console.log(err)
  });
  
  let sEmbed = new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setTitle("new category successfully set!")
  .setDescription("new category where tickets will be received!")
  .addField("changed by:", message.author, true)
  .addField("category name:", args.join(), true);
  
  message.channel.send(sEmbed);
  

}

module.exports.help = {
    name: "setcategory"
}