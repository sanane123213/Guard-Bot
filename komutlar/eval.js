const Discord = require('discord.js')
const util = require('util');
const tokenuyari = `NAH!`

exports.run = async (client, message, args) => {
   let prefix = "!" //Kendi prefiziniz
	if(!args[0]) {
		message.reply("Kod Belirt")
		return
	}
	const code = args.join(' ');
if (code == client["token"]){
  const newEmbed = new Discord.RichEmbed()
			.addField('Error;', `\`\`\`xl\n${tokenuyari}\`\`\``)
			.setColor('BLACK');
		message.channel.send(newEmbed);
		return
}
	if(code.match(/(client.token)/g)) {
		const newEmbed = new Discord.RichEmbed()
			.addField('Error;', `\`\`\`xl\n${tokenuyari}\`\`\``)
			.setColor('BLACK');
		message.channel.send(newEmbed);
		return
	}

	function clean(text) {
		if (typeof text !== 'string')
			text = require('util').inspect(text, { depth: 0 })
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
		return text;
	};

	const evalEmbed = new Discord.RichEmbed().setColor("BLUE")
	try {
		var evaled = clean(await eval(code));
		if(evaled.startsWith('NDc')) evaled = tokenuyari;
		if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
		else evalEmbed.setDescription(`\`\`\`xl\n${evaled}\n\`\`\``)
		const newEmbed = new Discord.RichEmbed()
			.addField('📥 Input', `\`\`\`javascript\n${code}\n\`\`\``)
			.addField('📤 Output', `\`\`\`xl\n${evaled}\`\`\``)
			.setColor("RANDOM")
		message.channel.send(newEmbed);
	}
	catch (err) {
		evalEmbed.addField('Error;', `\`\`\`xl\n${err}\n\`\`\``);
		evalEmbed.setColor('BLACK');
		message.channel.send(evalEmbed);
	}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["çalıştır"],
	permLevel: 4
}

exports.help = {
	name: 'eval',
	description: 'Secret',
	usage: 'eval'
}
