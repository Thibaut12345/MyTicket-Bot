const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client({
    partials: ["MESSAGE", "USER", "REACTION"]
});
bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();



fs.readdir("./commands/", (err, files) => {


    if (err) console.log(err);


    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden!");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);


    })


});

bot.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text');
    channel.send("Thank you for inviting me! follow the quick start by doing `!start`");
    const startEmbed = new discord.MessageEmbed()
    .setTitle(`Thank you for inviting me!`)
    .setColor("ff0000")
    .setDescription(`MyTicket has just been invited to **${guild.name}**! MyTicket is a bot that requires a little bit of attention to setup. Do !start in your server or follow the quick start on our site and Discord server!`)
    .addField("Website:", "Coming Soon!", true)
    .addField("Discord:", "https://discord.gg/vgHaWBt", true)
    .setFooter(`v0.1 | MyTicket | 2Snow#3693`, "https://cdn.discordapp.com/emojis/713388643120840734.gif?v=1");
    
    return guild.owner.send(startEmbed);
});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    setInterval(() => {

        let replies = ["!help", `${bot.users.cache.size} users!`, `${bot.guilds.cache.size} servers!`];
        let result = Math.floor((Math.random() * replies.length));


        bot.user.setActivity(`${replies[result]}`, {
            type: 'WATCHING'
        });

    }, 1000 * 30);
});



bot.on("message", async message => {

    // Als bot bericht stuurt stuur dan return 
    if (message.author.bot) return;


    if (message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botConfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;


    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);



    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);

    if (command === `${prefix}hallo`) {

        return message.channel.send("Hey!");

    }

    //============================================
    //=            Other commands                =
    //============================================

    if (command === `${prefix}members`) {

        var icon = message.author.displayAvatarURL();

        var serverEmbed = new discord.MessageEmbed()
            .setTitle(`:busts_in_silhouette: On this server there are ${message.guild.memberCount} members!`)
            .setColor("#ff0015")

        return message.channel.send(serverEmbed);

    }

//============================================
//=            ticket setup                  =
//============================================

    if (command === `${prefix}ticket-panel`) {

        let channel = message.mentions.channels.first();
        if (!channel) return message.channel.send("Usage !ticket-setup #channel");

        let sent = await channel.send(new discord.MessageEmbed()
            .setTitle("Ticket System")
            .setDescription("React with 🎟 to open a ticket!")
            .setFooter("Ticket System")
            .setColor("#ff0000")
        )

        sent.react('🎟');

        let ticketid = JSON.parse(fs.readFileSync("./ticketid.json", "utf8"));

        ticketid[message.guild.id] = {
            ticketid: sent.id
        };

        fs.writeFile("./ticketid.json", JSON.stringify(ticketid), (err) => {
            if (err) console.log(err)
        });


        message.channel.send("Ticket System setup done!")

    }


});



    bot.on('messageReactionAdd', async (reaction, user) => {

        const ticketid = JSON.parse(fs.readFileSync("./ticketid.json", "utf-8"));

        //Geen ticket message ID van guild gevonden -> Skip!
        if (!ticketid[reaction.message.guild.id]) return;

        const ticketidSend = ticketid[reaction.message.guild.id].ticketid;

        //TODO Prima dat je ze fetched -> Maar, check even of je al die data wel nodig hebt -> Zo niet, niet doen. Scheelt weer wachttijd :)
        if (user.partial) await user.fetch();
        if (reaction.partial) await reaction.fetch();
        if (reaction.message.partial) await reaction.message.fetch();

        //Als bot -> Skip
        if (user.bot) return;

        if (reaction.message.id === ticketidSend && reaction.emoji.name === '🎟') {
            reaction.users.remove(user);

            // Verkrijg username & discr
            const userName = reaction.message.author.username;
            const userDiscriminator = reaction.message.author;

            // Kijk na als ticket al gemaakt is.
            let bool = false;
            reaction.message.guild.channels.cache.forEach((channel) => {
                // Als ticket is gemaakt, zend bericht.
                if (channel.name == `ticket-${user.username.toLowerCase()}`) {
                    reaction.message.channel.send(`Je hebt al een ticket! Zie ${channel} voor je ticket!`).then(msg => msg.delete({
                        timeout: 5000
                    }));

                    bool = true;
                }
            });

            // Als ticket, return.
            if (bool == true) return;

            reaction.message.guild.channels.create("ticket" + "-" + user.username, "text").then(async (createdChan) => {
                await createdChan.overwritePermissions([{
                        id: user.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: reaction.message.guild.roles.cache.find(role => role.name === "@everyone").id,
                        deny: ['VIEW_CHANNEL'],

                    },
                    {
                        id: reaction.message.guild.roles.cache.find(role => role.name === "Support Team"),
                        allow: ['VIEW_CHANNEL'],

                    },
                ]);

                let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
                //TODO Levert die geen error op als ticketowners[createdChan.id] niet bestaat?
                ticketowners[createdChan.id] = {
                    ticketowners: user.id
                };
                fs.writeFile("./ticketowners.json", JSON.stringify(ticketowners), (err) => {
                    if (err) console.log(err)
                });

                const ticketEmbed = new discord.MessageEmbed()
                    .setTitle("test");

                await createdChan.send(ticketEmbed);

                const startEmbed = new discord.MessageEmbed()
                    .setTitle("Ticket Created")
                    .setDescription(`your ticket has been created! look ${createdChan} for your ticket!`)
                    .setColor("ff0000");

                await reaction.message.channel.send(startEmbed).then(msg => msg.delete({
                    timeout: 5000
                }));
            })
        }
    });

bot.login(botConfig.token);