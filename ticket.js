const discord = require("discord.js");
const fs = require("fs");
const Keyv = require('keyv');
    
const keyv = new Keyv('sqlite://sqlite.db');
keyv.on('error', err => console.log('Connection Error', err));

module.exports.run = async (bot, message, args) => {
     
     
     
     
    let ticketcategory = JSON.parse(fs.readFileSync("./ticketcategory.json", "utf-8"));

    if(!ticketcategory[message.guild.id]) {
    return message.channel.send("you have not specified a category where the ticket should be placed! ask an administrator to do **!setcategory (category)** more info in **!help** or in **!support**");;
    }
    let ticketcategorySend = ticketcategory[message.guild.id].ticketcategory;

    let ticketcategorySenda = message.guild.channels.cache.find(cat => cat.id === ticketcategorySend);
    if(!message.guild.channels.cache.find(cat => cat.id === ticketcategorySend)) return message.channel.send("you have not specified a category where the ticket should be placed! ask an administrator to do **!setcategory (category)** more info in **!help** or in **!support**");
     
     
     
     
    // Vang het onderwerp op.
    var subject = args.join(" ");
    
    let setopenreason = JSON.parse(fs.readFileSync("./setopenreason.json", "utf-8"));
    
    if(!setopenreason[message.guild.id]) {
    return;
    }
    let setopenreasonsend = setopenreason[message.guild.id].setopenreason;

    if (setopenreasonsend !== "off"  && !args.join(' ')) return message.channel.send("Enter a subject for creating a ticket! use: `!ticket <subject>`");
    
    if (!subject) subject = "No subject given!";
 
    // Verkrijg Gebruikersnaam
    var userName = message.author.username;
    // Verkrijg discriminator
    var userDiscriminator = message.author;
 
    // Als ticket al gemaakt is
    var bool = false;
        
    // Kijk na als ticket al gemaakt is.
    message.guild.channels.cache.forEach((channel) => {
 
        // Als ticket is gemaakt, zend bericht.
         if (channel.name == `ticket-${userName.toLowerCase()}`) {
 
            message.channel.send(`you have already created a ticket! look ${channel} for your ticket!`);
 
            bool = true;
 
        }
 
    });
    
     // Als ticket return code.
    if (bool == true) return;
    
    //support role uit database halen

    const role1 = await keyv.get(message.guild.id);
     
    
    
    
 
    // Als ticket return code.
    if (bool === true) return;
 
    var embedCreateTicket = new discord.MessageEmbed()
        .setTitle("Thanks " + message.author.username)
        .setDescription("your ticket will be created for you!" );
        
    
    message.channel.send(embedCreateTicket);
    
    
 
    // Maak kanaal en zet in juiste categorie.
    message.guild.channels.create("ticket" + "-" + userName, "text").then((createdChan) => { // Maak kanaal
    
    createdChan.setParent(ticketcategorySenda)
            
 
            // Zet perms voor iedereen
            createdChan.overwritePermissions([
                {
                   id: message.author.id,
                   allow: ['VIEW_CHANNEL'],
                },
                {
                   id: message.guild.roles.cache.find(role => role.name === "@everyone").id,
                   deny: ['VIEW_CHANNEL'],
                   
                },
                {
                    id: message.guild.roles.cache.find(role => role.id === role1),
                    allow: ['VIEW_CHANNEL'],

                },
              ]);
              
              
            let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf8" ));
  
            ticketowners[createdChan.id] = {
            ticketowners: message.author.id
            };
  
            fs.writeFile("./ticketowners.json", JSON.stringify(ticketowners), (err) => {
                if (err) console.log(err)
            });
              

            var embedParent = new discord.MessageEmbed()
                .setTitle("Thanks " + message.author.username.toString())
                .setDescription("put here what you want to say or ask. a staff member will help you as soon as possible!")
                .addField("subject:", subject, true);
                
             createdChan.send(embedParent);
             
                 
            var log = new discord.MessageEmbed()
                .setTitle(message.author.username.toString() + " has created a ticket!")
                .setColor("#00ff55")
                .addField("ticket name:", createdChan.name, true)
                .addField("subject:", subject, true);
                
                
    let loggchannel = JSON.parse(fs.readFileSync("./logg.json", "utf-8"));
    
    if(!loggchannel[message.guild.id]) {
    return;
    }
    let loggchannelsend = loggchannel[message.guild.id].loggchannel;

    let loggchannelsenda = message.guild.channels.cache.find(c => c.id === loggchannelsend);
    if (!loggchannelsenda) return;
        loggchannelsenda.send(log)

       
    })
        
            

    
    //Emoties aan tekst koppelen 
async function promptMessage(message, author, time, reactions) {
    // we gaan eerst tijd 1000 doen

   time *= 1000;

for (const reaction of reactions){
    await message.react(reaction);
}

const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

return message.awaitReactions(filter, {max: 1, time: time}).then(collected => collected.first().emoji.name);


}
}
 
module.exports.help = {
    name: "ticket",
    description: "Maak een ticket aan"
}