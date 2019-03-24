const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = "!";
const bot = new commando.Client({
  commandPrefix: prefix
});

class ticketCommand extends commando.Command {
    constructor(client) 
    {
      super(client, {
        name: 'new', 
        group: 'community',
        memberName: 'new',
        description: "Creates a support ticket"
      });
    }
    async run(message, args)
    {
        const reason = message.content.split(" ").slice(1).join(" ");
        if (message.guild.channels.exists("name", "support-" + message.author.id)) return message.channel.send("You already have a support room open.");
        message.guild.createChannel(`support-${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Policeunit");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                 SEND_MESSAGES: true,
                 READ_MESSAGES: true
            });
            message.channel.send(`Your ticket has been created, ${c.name}.`);
            const embed = new Discord.RichEmbed()
            .setColor("#4286f4")
            .addField(`Hey ${message.author.username}!, Your support ticket has been created, please explain the reason for this support room and we will respond within 24h.`, `Thanks for your patience.`)
            .setTimestamp()
            .setFooter("Moderation Bot [] Created by hieu#0843");
            c.send({ embed: embed });
        }).catch(console.error);
        }
}

module.exports = ticketCommand;
