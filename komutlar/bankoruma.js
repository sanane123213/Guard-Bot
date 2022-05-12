const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let kontrol = (await db.fetch(`ayarlar.${message.guild.id}.dil`)) || "en_US";
  if (kontrol !== "tr_TR") return;

  const DBL = require("dblapi.js");
  const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxODI1MDU5OTQ4NDg4MzAzNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkyNzc3ODgxfQ.Q1O0_q18EnYPaM4ctcQh7uvwRjaASs4tDktZbQmFi0I", client);
dbl.hasVoted(message.author.id).then(async voted => {
    if (voted) {
  var prefix =
    (await db.fetch(`ayarlar.${message.guild.id}.prefix`)) || ayarlar.prefix;
  if (!args[0]) {
    let ak = (await db.fetch(`ayarlar.${message.guild.id}.bankoruma`)) || "Kapalı";
    let log =
      (await db.fetch(`ayarlar.${message.guild.id}.banlog`)) || "Ayarlanmamış";
    let limit = (await db.fetch(`ayarlar.${message.guild.id}.banlimit`)) || 3;
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setTitle(ayarlar.botadı + "! | Türkçe Ban-Koruma")
      .addField(
        "Aktiflik (" + prefix + "ban-koruma <aç-kapat>)",
        ak
      )
      .addField(
        "Log Kanalı (" + prefix + "ban-koruma log <#Kanal/sıfırla>)",
        log
      )
      .addField(
        "Ban Limit (" + prefix + "ban-koruma limit <Limit/sıfırla>)",
        limit
      )
      .setFooter(ayarlar.botadı + "! | Daima Hizmet!")
      .setTimestamp();
    message.channel.send(embed);
  } else {
    if (args[0] == "aç") {
      let ak2 = await db.fetch(`ayarlar.${message.guild.id}.bankoruma`);
      if (ak2 == "Açık")
        return message.reply("Bu koruma zaten aktif!");
      else {
        message.channel.send("Koruma başarıyla etkinleştirildi!");
        db.set(`ayarlar.${message.guild.id}.bankoruma`, "Açık");
        return;
      }
    } else if (args[0] == "kapat") {
      let ak3 = await db.fetch(`ayarlar.${message.guild.id}.bankoruma`);
      if (ak3 == "Kapalı" || !ak3)
        return message.reply("Bu koruma zaten devre dışı!");
      else {
        message.channel.send("Koruma başarıyla devre dışı bırakıldı!");
        db.delete(`ayarlar.${message.guild.id}.bankoruma`);
        return;
      }
    } else if (args[0] == "log") {
      let çenıl = message.mentions.channels.first();
      if (args[1] == "sıfırla") {
        db.delete(`ayarlar.${message.guild.id}.banlog`);
        message.channel.send("Log kanalı başarıyla sıfırlandı!");
        return;
      }
      if (!çenıl) return message.reply("Hm, sanırım bir kanalı etiketlemelisin.");
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.banlog`);
      if (kontrol == çenıl.id)
        return message.reply(
          "Log kanalını aynı log kanalıyla değiştiremezsiniz!"
        );
      db.set(`ayarlar.${message.guild.id}.banlog`, çenıl.id);
      message.channel.send(
        "Log kanalı "+ çenıl +" olarak başarıyla güncellendi!"
      );
      return;
    } else if (args[0] == "limit") {
      let miktar = args[1];
      if (args[1] == "sıfırla") {
        db.delete(`ayarlar.${message.guild.id}.banlimit`);
        message.channel.send("Başarıyla sıfırlandı!");
        return;
      }
      if (!miktar)
        return message.reply("Hm, sanırım bir değer belirtmelisin.");
      if (isNaN(miktar))
        return message.reply(
          "Hm, sanırım **tam sayı** bir değer belirtmelisin."
        );
      if (miktar <= 0)
        return message.reply(
          "Hm, sanırım **pozitif** bir değer belirtmelisin."
        );
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.banlimit`);
      if (kontrol == miktar)
        return message.reply("Limiti aynı limitle değiştiremezsiniz!");
      db.set(`ayarlar.${message.guild.id}.banlimit`, miktar);
      message.channel.send("Limit başarıyla "+miktar+" olarak güncellendi!");
      return;
    } else
      message.channel.send(
        "Heeey, sadece; `aç, kapat, log, limit` olarak adlandırılan değerleri belirleyebilirsiniz!"
      );
  }
} else{
message.channel.send("Merhaba dostum! Bu linkten (https://top.gg/bot/718250599484883035/vote) botumuza oy vererek komutu kullanabilirsin! Bu zorunluluğu büyümemiz için koyduk, iyi günler. -Guard BOT ekibi");
return;
}
})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bankoruma"],
  permLevel: 3
};

exports.help = {
  name: "ban-koruma",
  description:
    "Türkçe Ban-Koruma Komutu. Bilgi için: -prefix-ban-koruma-sistemi",
  usage: `-prefix-ban-koruma`
};
