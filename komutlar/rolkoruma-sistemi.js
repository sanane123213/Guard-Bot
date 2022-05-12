const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require('quick.db');
exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol !== "tr_TR") return;
let prefix = await db.fetch(`ayarlar.${message.guild.id}.prefix`) || "!";

    const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setTitle(ayarlar.botadı+"! | Türkçe Rol-Koruma Sistem Menüsü")
    .addField(`Nedir bu; "rol-koruma" sistemi?`, `**Bu sistem sayesinde; sunucunuzda üst seviye bir rol koruması elde edebilirsiniz.**\n\nSistem dahilindeki komutlar;\n\`!rol-koruma\` = **Rolkoruma ayarlarını listeler.**\n\n\`!rol-koruma <aç-kapat>\` = **Rolkorumayı açıp kapatmaya yarar.**\n\n\`!rol-koruma izinli\` = **İzinliye eklenen roller; sistem tarafından algılanır, eğer bir limit varsa limit sayar fakat yinede loga düşer.**\n\n\`!rol-koruma izinli <ekle-sil> <@Rol>\` = **İzinli roller, limiti sayılacak rollerdir. Eklemek veya kaldırmak için bu komutu kullanınız.**\n\n\`!rol-koruma log <#Kanal/sıfırla>\` = **Herhangi biri rol sildiğinde/eklediğinde, onun loga düşmesini sağlar.**\n\n\`!rol-koruma limit <Limit/Sıfırla>\` = **İzinli roller için gerekli bir ayardır, eğer aktifse limit sayar, değilse direkt işleme geçer.**\n\n\`!rol-koruma yönetici <aç-kapat>\` = **Bu koruma sayesinde herhangi bir role kesinlikle yönetici verilemez.**`)
    .setFooter(ayarlar.botadı+"! | Daima Hizmet!")
    .setTimestamp()
    message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rolkoruma-sistemi"],
  permLevel: 0
};

exports.help = {
  name: "rol-koruma-sistemi",
  description: "Türkçe Rol-koruma Sistem Menüsü",
  usage: `-prefix-rol-koruma-sistemi`
};
