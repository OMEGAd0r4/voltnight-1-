//PLUGINS
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const prefix = "!";
const bot = new commando.Client({
    commandPrefix: prefix
});
//PLUGINS

//BOT TOKEN
bot.login(process.env.token);
//BOT TOKEN

//GETS THE BOT ONLINE
bot.on('ready',function(){
    console.log(`Bot is now online!, watching ${bot.users.size} users.`);
    bot.user.setActivity(`!help | Moderation Bot`, { type: 'PLAYING' });
});

//GETS THE BOT ONLINE

//REGISTIES
bot.registry.registerGroup('admin', 'ADMIN');
bot.registry.registerGroup('community', 'COMMUNITY');
bot.registry.registerGroup('essential', 'ESSENTIAL');
bot.registry.registerCommandsIn(__dirname + "/commands");
bot.registry.registerDefaults();
//REGISTIES

//WELCOME MESSAGE
bot.on('guildMemberAdd', (member) => {
    const welcomechannel = member.guild.channels.find('name', `general`);
    const welcomerole = message.guild.roles.find("name", `member`);
    welcomechannel.send({embed: new Discord.RichEmbed()
        .setColor("#4286f4")
        .setTitle("**New Member**")
        .setDescription(`:busts_in_silhouette:|**Greetings,** ${member}. Welcome to the **Network**.`)}).then(member.addRole(welcomerole.id));
})
//WELCOME MESSAGE

bot.on('message', function(message) {
    if (message.content == "!clear") {
        try {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                messages = message.channel.fetchMessages();
                message.channel.bulkDelete(messages);
            }
        } catch(e) {
            message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
            console.log(e);
        }
    }

});










