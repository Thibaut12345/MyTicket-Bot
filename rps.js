const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let replies = ["rock", "paper", "scissors"];
    
    var result = replies[Math.floor(Math.random() * replies.length)];
    
    let keuze = args[0];
   
    if(!keuze) return message.channel.send("Please use: !rps (rock/paper/scissors)");
    if (args[0] !== "rock"  && args[0] !== "paper" && args[0] !== "scissors") return message.channel.send("Please use: !rps (rock/paper/scissors)");
    
    if(keuze == "rock" && result == "rock") return message.channel.send("it's the same! i also had rock 😐");
    if(keuze == "rock" && result == "paper") return message.channel.send("I win! i had paper 😀");
    if(keuze == "rock" && result == "scissors") return message.channel.send("you win! I had scissors 😕");
    
    if(keuze == "paper" && result == "rock") return message.channel.send("you win! I had rock 😕");
    if(keuze == "paper" && result == "paper") return message.channel.send("it's the same! i also had paper 😐");
    if(keuze == "paper" && result == "scissors") return message.channel.send("I win! i had scissorsr 😀")
    
    if(keuze == "scissors" && result == "rock") return message.channel.send("I win! i had rock 😀");
    if(keuze == "scissors" && result == "paper") return message.channel.send("you win! I had paper 😕");
    if(keuze == "scissors" && result == "scissors") return message.channel.send("it's the same! i also had scissors 😐");
    
    
    
    
}

module.exports.help = {
    name: "rps"
}