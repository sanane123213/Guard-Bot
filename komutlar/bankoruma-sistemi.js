const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let kontrol = (await db.fetch(`ayarlar.${message.guild.id}.dil`)) || "en_US";
  if (kontrol !== "tr_TR") return;
  let prefix = (await db.fetch(`ayarlar.${message.guild.id}.prefix`)) || "!";

  const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setTitle(ayarlar.botadı + "! | Türkçe Ban-Koruma Sistem Menüsü")
    .addField(
      `Nedir bu; "ban-koruma" sistemi?`,
      `**Bu sistem sayesinde sunucunuzda üst düzey "ban-koruma"sı elde edebilirsiniz.**\n\nSistem Dahilindeki Komutlar;\n\`${prefix}ban-koruma\` = **Koruma ayarlarını listeler.**\n\n\`${prefix}ban-koruma <aç-kapat>\` = **Ban korumayı açıp kapatmaya yarar.**\n\n\`${prefix}ban-koruma log <#Kanal/reset>\` = **Birisi üyeleri yasakladığında, bilgilerin loga düşmesini sağlar.**\n\n\`${prefix}ban-koruma limit <Limit/sıfırla>\` = **Ban limiti üye banlama limiti görevini görür.**`
    )
    .setFooter(ayarlar.botadı + "! | Daima Hizmet!")
    .setTimestamp();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bankoruma-sistemi"],
  permLevel: 0
};

exports.help = {
  name: "ban-koruma-sistemi",
  description: "Türkçe Ban-Koruma Sistem Menüsü",
  usage: `-prefix-ban-koruma-sistemi`
};
