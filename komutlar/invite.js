const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (bot, message, args) => {
  let kontrol = (await db.fetch(`ayarlar.${message.guild.id}.dil`)) || "en_US";
  if (kontrol !== "en_US") return;
const embed = new Discord.RichEmbed()
.setColor("#7289DA")
.setDescription("[By adding me to the server, you can both grow us and protect the server for free! For additional features, you can get packages available on our support server!](https://discordapp.com/oauth2/authorize?client_id=709799009891516467&scope=bot&permissions=8) ([Our Support Server](https://discord.gg/DfzxGR3))")
.setFooter(bot.user.username, bot.user.avatarURL)
message.channel.send(embed)            
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["add"],
  permLevel: 0
};

exports.help = {
  name: "invite",
  description: "Add the GUARD BOT!",
  usage: "-prefix-invite"
};