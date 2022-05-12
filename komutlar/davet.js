const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (bot, message, args) => {
  let kontrol = (await db.fetch(`ayarlar.${message.guild.id}.dil`)) || "en_US";
  if (kontrol !== "tr_TR") return;
const embed = new Discord.RichEmbed()
.setColor("#7289DA")
.setDescription("[Beni sunucuna ekleyerek hem bizi büyütür, hemde sunucunu bedavadan koruyabilirsin! Ek özellikler için destek sunucumuzda bulunan paketleri alabilirsin!](https://discordapp.com/oauth2/authorize?client_id=709799009891516467&scope=bot&permissions=8) ([Destek Sunucumuz](https://discord.gg/DfzxGR3))")
.setFooter(bot.user.username, bot.user.avatarURL)
message.channel.send(embed)            
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ekle"],
  permLevel: 0
};

exports.help = {
  name: "davet",
  description: "Guard'ı davet etmeye ne dersin?",
  usage: "-prefix-davet"
};