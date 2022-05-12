const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let kontrol = (await db.fetch(`ayarlar.${message.guild.id}.dil`)) || "en_US";
  if (kontrol !== "tr_TR") return;
  let prefix = (await db.fetch(`ayarlar.${message.guild.id}.prefix`)) || "!";

  const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setTitle(ayarlar.botadı + "! | Türkçe Kanal-Koruma Sistemi Menüsü")
    .addField(
      `Ne bu; "kanal-koruma" sistemi?`,
      `**Bu sistem sayesinde; sunucunuzda üst seviye bir kanal koruması elde edebilirsiniz.**\n\nSistem dahilindeki komutlar;\n\`${prefix}kanal-koruma\` = **Kanal-koruma ayarlarını listeler.**\n\n\`${prefix}kanal-koruma <aç-kapat>\` = **Kanal-korumayı açıp kapatmaya yarar.**\n\n\`${prefix}kanal-koruma izinli\` = **İzinliye eklenen roller; sistem tarafından algılanır, eğer bir limit varsa limit sayar fakat yinede loga düşer.**\n\n\`${prefix}kanal-koruma izinli <ekle-sil> <@Rol>\` = **İzinli roller, limiti sayılacak rollerdir. Eklemek veya kaldırmak için bu komutu kullanınız.**\n\n\`${prefix}kanal-koruma log <#Kanal/sıfırla>\` = **Herhangi biri rol sildiğinde/eklediğinde, onun loga düşmesini sağlar.**\n\n\`${prefix}kanal-koruma limit <Limit/sıfırla>\` = **İzinli roller için gerekli bir ayardır, eğer aktifse limit sayar, değilse direkt işleme geçer.**`
    )
    .setFooter(ayarlar.botadı + "! | Daima Hizmet!")
    .setTimestamp();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kanalkoruma-sistemi"],
  permLevel: 0
};

exports.help = {
  name: "kanal-koruma-sistemi",
  description: "Türkçe Kanal-koruma Sistem Menüsü",
  usage: `-prefix-kanal-koruma-sistemi`
};
