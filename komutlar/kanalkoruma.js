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
    let limit = (await db.fetch(`ayarlar.${message.guild.id}.kanalklim`)) || 0;
    let log;
    if (!(await db.fetch(`ayarlar.${message.guild.id}.kanalklog`)))
      log = "Ayarlanmamış!";
    else log = `<#${await db.fetch(`ayarlar.${message.guild.id}.kanalklog`)}>`;
    let roller = [];
    let ak = (await db.fetch(`ayarlar.${message.guild.id}.aktifk`)) || "Kapalı";
    let a = await db.fetch(`ayarlar.${message.guild.id}.kanalkistisna`);
    if (!a) roller.push("Ayarlanmamış!");
    else {
      a.forEach(x => {
        roller.push(`<@&${x}>`);
      });
    }
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setTitle(ayarlar.botadı+"! | Türkçe Kanal-Koruma")
      .addField("Aktiflik ("+prefix+"kanal-koruma <aç-kapat>)", ak)
      .addField("Log Kanalı ("+prefix+"kanal-koruma log <#Kanal/sıfırla>)", log)
      .addField("Silme Limiti ("+prefix+"kanal-koruma limit <Limit/sıfırla>)", limit)
      .addField(
        "İstisna Roller ("+prefix+"kanal-koruma izinli <ekle-sil> <@Rol>)",
        roller.join("-")
      )
      .setFooter(ayarlar.botadı+"! | Daima Hizmet!")
      .setTimestamp();
    message.channel.send(embed);
  } else {
    if (args[0] == "aç") {
      let ak2 = await db.fetch(`ayarlar.${message.guild.id}.aktifk`);
      if (ak2 == "Açık") return message.reply("Bu koruma zaten aktif!");
      else {
        message.channel.send("Koruma başarıyla aktif edildi!");
        db.set(`ayarlar.${message.guild.id}.aktifk`, "Açık");
        return;
      }
    } else if (args[0] == "kapat") {
      let ak3 = await db.fetch(`ayarlar.${message.guild.id}.aktifk`);
      if (ak3 == "Kapalı" || !ak3)
        return message.reply("Bu koruma zaten deaktif!");
      else {
        message.channel.send("Koruma başarıyla deaktif edildi!");
        db.delete(`ayarlar.${message.guild.id}.aktifk`);
        return;
      }
    } else if (args[0] == "log") {
      let çenıl = message.mentions.channels.first();
      if (args[1] == "sıfırla") {
        db.delete(`ayarlar.${message.guild.id}.kanalklog`);
        message.channel.send("Başarıyla log kanalı sıfırlandı!");
        return;
      }
      if (!çenıl)
        return message.reply("Hm, sanırım bir kanalı etiketlemen lazım.");
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.kanalklog`);
      if (kontrol == çenıl.id)
        return message.reply(
          "Log kanalını aynı log kanalı ile değiştiremezsin!"
        );
      db.set(`ayarlar.${message.guild.id}.kanalklog`, çenıl.id);
      message.channel.send(
        "Başarıyla log kanalı " + çenıl + " olarak güncellendi!"
      );
      return;
    } else if (args[0] == "limit") {
      let miktar = args[1];
      if (args[1] == "sıfırla") {
        db.delete(`ayarlar.${message.guild.id}.kanalklim`);
        message.channel.send("Başarıyla kanal-koruma limiti sıfırlandı!");
        return;
      }
      if (!miktar)
        return message.reply("Hm, sanırım bir değer belirtmen lazım.");
      if (isNaN(miktar))
        return message.reply(
          "Hm, sanırım **tam sayı** bir değer belirtmen lazım."
        );
      if (miktar <= 0)
        return message.reply(
          "Hm, sanırım **pozitif** bir değer belirtmen lazım."
        );
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.kanalklim`);
      if (kontrol == miktar)
        return message.reply("Limiti aynı limit ile değiştiremezsin!");
      db.set(`ayarlar.${message.guild.id}.kanalklim`, miktar);
      message.channel.send(
        "Başarıyla limit " + miktar + " olarak güncellendi!"
      );
      return;
    } else if (args[0] == "izinli") {
      if (args[1] == "ekle") {
        let rol = message.mentions.roles.first();
        if (!rol)
          return message.reply("Hm, sanırım bir rol etiketlemen lazım.");

        let a = await db.fetch(`ayarlar.${message.guild.id}.kanalkistisna`);
        if (!a) {
          db.push(`ayarlar.${message.guild.id}.kanalkistisna`, rol.id);
          message.channel.send(
            "Başarıyla " + rol + " istisna rollere eklendi!"
          );
          return;
        } else {
          let kontrol;
          a.forEach(x => {
            if (rol.id === x) return (kontrol = "var");
            else return (kontrol = "yok");
          });
          if (kontrol == "var") return message.reply("Hey, zaten bu rol ekli!");
          db.push(`ayarlar.${message.guild.id}.kanalkistisna`, rol.id);
          message.channel.send(
            "Başarıyla " + rol + " istisna rollere eklendi!"
          );
          return;
        }
      } else if (args[1] == "sil") {
        let rol = message.mentions.roles.first();
        if (!rol)
          return message.reply("Hm, sanırım bir rol etiketlemen lazım.");

        let a = await db.fetch(`ayarlar.${message.guild.id}.kanalkistisna`);
        if (!a) {
          message.channel.send("Hey, zaten hiç istisna rolü yok!");
          return;
        } else {
          let kontrol;
          a.forEach(x => {
            if (rol.id === x) return (kontrol = "yok");
          });
          if (kontrol === "yok") {
            let yeni = [];
            let say = 0;
            a.forEach(x => {
              say++;
              if (rol.id == x) return;
              else return yeni.push(x);
            });
            if (say == 1)
              db.delete(`ayarlar.${message.guild.id}.kanalkistisna`);
            else {
              db.set(`ayarlar.${message.guild.id}.kanalkistisna`, yeni);
            }

            message.channel.send(
              "Başarıyla " + rol + " istisna rollerden silindi!"
            );
            return;
          } else return message.reply("Hey, zaten bu rol ekli değil!");
        }
      } else {
        message.channel.send(
          "Heeey, sadece; `ekle, sil` adında değerler belirtebilirsin!"
        );
      }
    } else {
      message.channel.send(
        "Heeey, sadece; `aç, kapat, log, limit, izinli` adında değerler belirtebilirsin!"
      );
    }
  }
}else{
message.channel.send("Merhaba dostum! Bu linkten (https://top.gg/bot/718250599484883035/vote) botumuza oy vererek komutu kullanabilirsin! Bu zorunluluğu büyümemiz için koyduk, iyi günler. -Guard BOT ekibi");
return;
}
})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kanalkoruma"],
  permLevel: 3
};

exports.help = {
  name: "kanal-koruma",
  description:
    "Türkçe Kanal-Koruma Komutu. Detaylı bilgi için -prefix-kanal-koruma-sistemi",
  usage: `-prefix-kanal-koruma`
};
