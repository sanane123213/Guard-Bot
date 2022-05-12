const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")
exports.run = async (client, message, args) => {
let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol != "tr_TR") return;
let prefix = await db.fetch(`ayarlar.${message.guild.id}.prefix`) || "!";
if (!args[0]) {
const embed = new Discord.RichEmbed()
.setColor("#7289DA")
.setTitle(ayarlar.botadı+"! | Türkçe Yardım Menüsü")
.addField("Bot Komutları;", `\`${prefix}yardım\`, \`${prefix}dil\`, \`${prefix}bot-bilgi\`, \`${prefix}shard-bilgi\`, \`${prefix}davet\``)
.addField("Rol Koruma;", `\`${prefix}rol-koruma-sistemi\``)
.addField("Kanal Koruma;", `\`${prefix}kanal-koruma-sistemi\``)
.addField("Ban Koruma;", `\`${prefix}ban-koruma-sistemi\``)
message.channel.send(embed)
} else{
  let komut = client.commands.find(e => e.help.name === args[0]) || client.commands.find(e => e.conf.aliases.includes(args[0]))
    if(!komut) return message.reply("Böyle bir komut bulamadım!")
    let yan = komut.conf.aliases
    const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setTitle(ayarlar.botadı+"! | Komut Yardım")
    .addField(`Komut;`, `\`${komut.help.name}\``)
    .addField(`Açıklama;`, `\`${komut.help.description.replace(`-prefix-`, prefix)}\``)
    .addField(`Kullanım;`, `\`${komut.help.usage.replace(`-prefix-`, prefix)}\``)
    .addField(`Yan Kullanımlar;`, `\`${yan}\``)
    .setFooter(ayarlar.botadı+"! | Daima Hizmet!")
    .setTimestamp()
    message.channel.send(embed)
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Türkçe yardım komutu.",
  usage: "-prefix-yardım"
};
