const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")
exports.run = async (client, message, args) => {
let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol != "en_US") return;
let prefix = await db.fetch(`ayarlar.${message.guild.id}.prefix`) || "!";
let dil = args[0]
if(!dil) return message.reply("Please enter a language code!\nLanguage Codes; `en_US (English)`, `tr_TR (Türkçe)`")
if(dil == "en_US") return message.reply("The language is already `en_US (English)`!")
else if(dil == "tr_TR") {
  db.set(`ayarlar.${message.guild.id}.dil`, "tr_TR")
  message.reply("Yeni dil `tr_TR (Türkçe)` olarak ayarlandı!")
} else return message.reply("There is no such language code!\nLanguage Codes; `en_US (English)`, `tr_TR (Türkçe)`")
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["lang"],
  permLevel: 3
};

exports.help = {
  name: "language",
  description: "You can change bot language with the command!",
  usage: "-prefix-language"
};
