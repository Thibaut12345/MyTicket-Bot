const discord = require("discord.js");
const fs = require("fs");
const Keyv = require('keyv');

const keyv = new Keyv('sqlite://sqlite.db');
keyv.on('error', err => console.log('Connection Error', err));

module.exports.run = async (bot, message, args) => {

    let reason = args.join(" ");
    if(!reason) reason = "no reason given";
    
    const text2 = await message.channel.messages.fetch();
    const content = text2.map( m => `${m.author.tag} - ${m.content}`)
    fs.writeFile('transcript.txt', content.join('\n'), (error) => {
        if (error) throw error
    })
    
    var errorEmbed = new discord.MessageEmbed()
    .setTitle("⛔️ WHOOPS! ⛔️️️")
    .setColor("ff0000")
    .setDescription("According to the data I get from the database, this is not a ticket channel! **You can always delete the channel manually!** if this is a ticket, report it to our Discord **(!support)** so that our developers can do something about it as soon as possible!");

    // perms instellen
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**OOPS!** You can't close a ticket!");
    

    let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
    if (!ticketowners[message.channel.id]) {
        return message.channel.send(errorEmbed);
    }
    let ticketowner = ticketowners[message.channel.id].ticketowners;


    message.channel.send("This ticket will be deleted in 10 seconds!");


    setTimeout(() => {
        
        message.channel.delete();
      
       var embedCloseTicket = new discord.MessageEmbed()
        .setTitle(`Your ticket in **${message.guild.name}** is marked as completed!`)
        .setThumbnail("https://cdn.discordapp.com/attachments/721821094201262130/732298853331763340/PicsArt_07-13-07.39.38.png")
        .setColor("#ff0000")
        .addField("📥 ticket saved!", "```Your ticket is marked as completed, and stored by the respective server! see a transcript of your ticket below!```" )
        .addField("closed by 🎈", message.author, true)
        .addField("reason 🎀", reason, true)
        .addField("ticket name 🏷", message.channel.name, true)
        .setFooter("Bot made by 2Snow#3693", "https://cdn.discordapp.com/attachments/707613063250968599/710504622904836136/2Snow.png");
        message.guild.member(ticketowner).send(embedCloseTicket);
        
        message.guild.member(ticketowner).send(new discord.MessageAttachment("transcript.txt", "transcript.txt"));

        
    }, 10000);
    
    var log = new discord.MessageEmbed()
        .setTitle(message.author.username.toString() + " has closed a ticket!")
        .setColor("#ff0000")
        .setThumbnail("https://cdn.discordapp.com/attachments/721821094201262130/732298853331763340/PicsArt_07-13-07.39.38.png")
        .addField("ticket name:", message.channel.name, true)
        .addField("reason:", reason, true);
    const keyv = new Keyv('sqlite://sqlite.db');
    keyv.on('error', err => console.log('Connection Error', err));
  
    const waarde = message.guild.id;
    const channel = await keyv.get(`${waarde}`);
    const kanaal = message.guild.channels.cache.get(channel);
    if(!kanaal) return 
    
    kanaal.send(log);
    return kanaal.send(new discord.MessageAttachment("transcript.txt", "transcript.txt"));
    
    
  
}

module.exports.help = {
    name: "close",
    description: "Sluit een ticket af"
}