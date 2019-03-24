const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = "!";
const bot = new commando.Client({
  commandPrefix: prefix
});

class kickCommand extends commando.Command{
  constructor(client) 
  {
    super(client, {
      name: 'kick', 
      group: 'admin',
      memberName: 'kick',
      description: "Kick a user"
    });
  }
  async run (message, args)
  {
        var warnargs = message.content.slice(prefix.length).split(/ + /); //MAIN ARGS
        var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(warnargs[0]));
        var warnreason = warnargs.join(" ").slice(27);

        if (!warnUser) return message.channel.send({embed: new Discord.RichEmbed()
            .setDescription(":x: **Missing args**")
            .setColor("#FF4040")
            .addField("->", "!kick [User] [Reason]")});
    
        var supportteamerole = message.guild.roles.find(`name`, "Policeunit");

        if (!supportteamerole.id) message.channel.send("Couldn't find a role called ``Policeunit``.");
        
        if (!message.member.roles.has(supportteamerole.id)) return message.channel.send("Insufficient permission. You do not have permission to kick others");

        if (warnUser.roles.has(supportteamerole.id)) return message.channel.send("Insufficient permission. You do not have permission to kick staff members!");
        
        if (!warnreason) return message.channel.send({embed: new Discord.RichEmbed()
            .setDescription(":x: **Missing args**")
            .setColor("#FF4040")
            .addField("->", "!kick [User] [Reason]")});
        
          var warnembed = new Discord.RichEmbed()
          .setColor("#4286f4")
          .setTitle('**Kick | Information**')
          .setDescription(`${warnUser}, kicked by ${message.author}`)
          .addField(`**REASON:**`, warnreason)message.guild.member(warnUser.ban(warnreason));
    
          message.guild.member(warnUser.ban(warnreason));

          let logschannel = message.guild.channels.find(`name`, "logs");
          if(!logschannel) return message.channel.send("Couldn't find a channel called ``#logs``.");

          logschannel.send(warnembed);

        warnUser.sendMessage(warnUser + " Hey you have been kicked for " + '[' + warnreason + ']').catch()

        message.delete();
  }
}

module.exports = kickCommand
