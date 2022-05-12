const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

module.exports = async client => {
  client.user.setStatus("online");
  var oyun = ["💓 𝓐𝓼𝓽𝓻𝓪𝓵 𝓓𝓮𝓿𝓮𝓵𝓸𝓹𝓶𝓮𝓷𝓽 💓"];

  setInterval(async () => {
    var random = Math.floor(Math.random() * oyun.length+0);
    client.user.setActivity(oyun[random], { type: "WATCHING" });
  }, 12000);
};
