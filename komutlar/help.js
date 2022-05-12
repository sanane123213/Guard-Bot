const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")
exports.run = async (client, message, args) => {
let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol != "en_US") return;
let prefix = await db.fetch(`ayarlar.${message.guild.id}.prefix`) || "!";
  if(!args[0]){
const embed = new Discord.RichEmbed()
.setColor("#7289DA")
.setTitle(ayarlar.botadı+"! | English Help Menu")
.addField("Bot Commands;", `\`${prefix}help\`, \`${prefix}language\`, \`${prefix}bot-info\`, \`${prefix}shard-info\`, \`${prefix}invite\``)
.addField("Role Protection;", `\`${prefix}role-protection-system\``)
.addField("Channel Protection;", `\`${prefix}channel-protection-system\``)
.addField("Ban Protection;", `\`${prefix}ban-protection-system\``)
message.channel.send(embed)
  } else{
  let komut = client.commands.find(e => e.help.name === args[0]) || client.commands.find(e => e.conf.aliases.includes(args[0]))
    if(!komut) return message.reply("I couldn't find such a command!")
    let yan = komut.conf.aliases
    const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setTitle(ayarlar.botadı+"! | Command Help")
    .addField(`Command;`, `\`${komut.help.name}\``)
    .addField(`Description;`, `\`${komut.help.description.replace(`-prefix-`, prefix)}\``)
    .addField(`Usage;`, `\`${komut.help.usage.replace(`-prefix-`, prefix)}\``)
    .addField(`Aliases;`, `\`${yan}\``)
    .setFooter(ayarlar.botadı+"! | Always Service!")
    .setTimestamp()
    message.channel.send(embed)
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h"],
  permLevel: 0
};

exports.help = {
  name: "help",
  description: "English help command.",
  usage: "-prefix-help"
};
