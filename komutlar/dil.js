const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")
exports.run = async (client, message, args) => {
let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol != "tr_TR") return;
let prefix = await db.fetch(`ayarlar.${message.guild.id}.prefix`) || "!";
let dil = args[0]
if(!dil) return message.reply("Lütfen bir dil kodu giriniz!\nDil Kodları; `en_US (İngilizce)`, `tr_TR (Türkçe)`")
if(dil == "tr_TR") return message.reply("Dil zaten halihazırda `tr_TR (Türkçe)`!")
else if(dil == "en_US") {
  db.set(`ayarlar.${message.guild.id}.dil`, "en_US")
  message.reply("The new language is set to `en_US (English)`!")
} else return message.reply("Böyle bir dil kodu yok!\nDil Kodları; `en_US (İngilizce)`, `tr_TR (Türkçe)`")
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["dil-değiştir"],
  permLevel: 3
};

exports.help = {
  name: "dil",
  description: "Bu komut ile botun dilini değiştirebilirsiniz!",
  usage: "-prefix-dil"
};
