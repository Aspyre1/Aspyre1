const Discord = require('discord.js');
const discordMoosik = require('discord-moosik')
const bot = new Discord.Client();
const ddiff = require ('return-deep-diff');

bot.on('ready', () => {
    console.log('I have connected to the server!');
});

const prefix = "!!";
// GUILD EVENTS
bot.on('guildDelete', guild => {
    console.log(`I have left ${guild.name} at ${new Date()}`)
});

bot.on('guildCreate', guild => {
    guild.defaultChannel.sendMessage(`**Hello My name is Omega, Im your new discord bot**`);
});

bot.on('guildMemberAdd', member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage(`**Welcome ${member.user} to Omega Server!**`)
	var joinrole = member.guild.roles.find('name', 'Test');
    member.addRole(joinrole);
});

bot.on('guildBanAdd', (guild, user) => {
	guild.defaultChannel.sendMessage(`${user.username} has just been banned`)
});

bot.on('guildBanRemove', (guild, user) => {
	guild.defaultChannel.sendMessage(`${user.username} has just been unbanned`)
});

bot.on('guildMemberRemove', member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage(`**Bye ${member.user}, Hope to see you again!**`)
});

bot.on('channelPinsUpdate', (channel, time) => {
	channel.guild.defaultChannel.sendMessage(`The pins for ${channel.name} Have been updated (${time})`);
});

bot.on('messageDeleteBulk', messages => {
	console.log(`${messages.size} was deleted!`);
});

bot.on('message', (message) => {

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

let command = message.content.split(' ')[0];
command = command.slice(prefix.length)

let args = message.content.split(' ').slice(1);

 if (message.content.startsWith(prefix + 'join')) {
		let voiceChan = message.member.voiceChannel;
		if (!voiceChan || voiceChan.type !== 'voice') {
			message.channel.sendMessage('No').catch(error => message.channel.sendMessage(error));
		} else if (message.guild.voiceConnection) {
			message.channel.sendMessage('I\'m already in a voice channel');
		} else {
			message.channel.sendMessage('Joining...').then(() => {
				voiceChan.join().then(() => {
					message.channel.sendMessage('Joined successfully.').catch(error => message.channel.sendMessage(error));
				}).catch(error => message.channel.sendMessage(error));
			}).catch(error => message.channel.sendMessage(error));
		}
	} else

	if (message.content.startsWith(prefix + 'leave')) {
		let voiceChan = message.member.voiceChannel;
		if (!voiceChan) {
			message.channel.sendMessage('I am not in a voice channel');
		} else {
			message.channel.sendMessage('Leaving...').then(() => {
				voiceChan.leave();
			}).catch(error => message.channel.sendMessage(error));
		}
	}


  if (message.content.startsWith(prefix + "purge")) {
	  // Copyright Hazeral 2017
		let amount = message.content.split(" ").splice(1, 2).join(" ");
		if(isNaN(parseInt(amount))) {
			message.channel.bulkDelete(100);
			message.channel.sendMessage("Chat Cleared. Amount: 100");
			return;
		}
		if(amount > 100) {
			return message.reply("Please choose a number between 1-100.");
		}
		message.channel.bulkDelete(amount);
		message.channel.sendMessage("Chat Cleared. Amount: " + amount);
  }
	
if (command === 'say') {
    message.channel.sendMessage(args.join(' '));
}

    if (command === 'help') {
        message.reply('Goto :link: To get the help you need!');
    } else

    if (command === 'ping') {
        message.channel.sendMessage('pong');
    }
});

bot.login('MjY2NjcxNjI5MDY3NzQ3MzM4.C1KkNA.WCXRGGN7eH7-IuDCRWuPBDBbMqQ');