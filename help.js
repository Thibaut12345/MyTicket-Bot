const discord = require("discord.js");
const fs = require("fs");
 
module.exports.run = async (bot, message, args) => {
    
    
        var GeneralEmbed = new discord.MessageEmbed()
        .setTitle(`:robot: | MyTicket Help`)
        .setColor("#ff0000")
        .setThumbnail("https://cdn.discordapp.com/attachments/722067178240606258/722742905718046742/unknown.png")
        .addField("General Information:", [
            `**!help** - Shows all of my commands`,
            `**!about** - Get to know who I am`,
            `**!status** - Get information about the status of MyTicket`,
            `**!support** - Get the support server where you can ask questions`,
            `\u200b`
            
         ])
         
          
            .addField("Ticket help:", [
            `**!ticket** - Open a ticket`,
            `**!close** - Close a ticket`,
            `**!info** - See the information about a ticket`,
            `**!adduser** - Add a user to a ticket`,
            `**!removeuser** - remove a user from a ticket`,
            `**!rename** - Rename a ticket`,
             `\u200b`
             
            
            
        ])
        
        
        .addField("Ticket setup:", [
            `**!ticket-panel** - React with a emoji to make a ticket`,
            `**!setrole** - Set the staff role`,
            `**!openreason** - tell people to give a reason or not to make a ticket`,
            `**!setprefix** - Set your own prefix`, 
            `\u200b`
            
         ])
         
         
         .addField("Fun Commands:", [
            `**!lovecheck** - See if someone loves you`,
            `**!8ball** - Ask questions to the bot`,
            `**!rps** - Rock Paper Scissors`,
            `**!joke** - Get some nice jokes`, 
            `\u200b`
            
         ])
         
         .setFooter("v0.1 | MyTicket | 2Snow#3693", "https://cdn.discordapp.com/emojis/394235019176050688.gif?v=1");
         
         
         return message.channel.send(GeneralEmbed);
         
}
 
module.exports.help = {
    name: "help",
}