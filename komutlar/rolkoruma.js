const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol !== "tr_TR") return;



  var prefix =
    (await db.fetch(`ayarlar.${message.guild.id}.prefix`)) || ayarlar.prefix;
  if(!args[0]){
    let limit = await db.fetch(`ayarlar.${message.guild.id}.rolklim`) || 0
    let ak23 = await db.fetch(`ayarlar.${message.guild.id}.aktify`) || "Kapalı"
  let log
  if(!await db.fetch(`ayarlar.${message.guild.id}.rolklog`)) log = "Ayarlanmamış!"
  else log = `<#${(await db.fetch(`ayarlar.${message.guild.id}.rolklog`))}>`
  let roller = []
  let ak = await db.fetch(`ayarlar.${message.guild.id}.aktif`) || "Kapalı"
  let a = await db.fetch(`ayarlar.${message.guild.id}.rolkistisna`)
  if(!a) roller.push("Ayarlanmamış!")
  else{
    a.forEach(x => {
      roller.push(`<@&${x}>`)
    })
  }
  const embed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle(ayarlar.botadı+"! | Türkçe Rol-Koruma")
  .addField("Aktiflik ("+prefix+"rol-koruma aç-kapat)", ak)
  .addField("Log Kanalı ("+prefix+"rol-koruma log <#Kanal/sıfırla>)", log)
  .addField("Silme Limiti ("+prefix+"rol-koruma limit <Limit/sıfırla>)", limit)
  .addField("İstisna Roller ("+prefix+"rol-koruma izinli ekle-sil <@Rol>)", roller.join("-"))
  .addField("Yönetici Koruması ("+prefix+"rol-koruma yönetici aç-kapat)", ak23)
  .setFooter(ayarlar.botadı+"! | Daima Hizmet!")
  .setTimestamp();
  message.channel.send(embed);
  }else{
    if(args[0] == "aç"){
      let ak2 = await db.fetch(`ayarlar.${message.guild.id}.aktif`)
      if(ak2 == "Açık") return message.reply("Bu koruma zaten aktif!")
      else{
        message.channel.send("Koruma başarıyla aktif edildi!")
        db.set(`ayarlar.${message.guild.id}.aktif`, "Açık")
        return;
      }
    } else if(args[0] == "kapat"){
      let ak3 = await db.fetch(`ayarlar.${message.guild.id}.aktif`)
      if(ak3 == "Kapalı" || !ak3) return message.reply("Bu koruma zaten deaktif!")
      else{
        message.channel.send("Koruma başarıyla deaktif edildi!")
        db.delete(`ayarlar.${message.guild.id}.aktif`)
        return;
      }
    }
    else if(args[0] == "log"){
      let çenıl = message.mentions.channels.first()
      if(args[1] == "sıfırla"){
        db.delete(`ayarlar.${message.guild.id}.rolklog`)
        message.channel.send("Başarıyla log kanalı sıfırlandı!")
        return;
      }
      if(!çenıl) return message.reply("Hm, sanırım bir kanalı etiketlemen lazım.")
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.rolklog`)
      if(kontrol == çenıl.id) return message.reply("Log kanalını aynı log kanalı ile değiştiremezsin!")
      db.set(`ayarlar.${message.guild.id}.rolklog`, çenıl.id)
      message.channel.send("Başarıyla log kanalı "+çenıl+" olarak güncellendi!")
      return;
    } else if(args[0] == "limit"){
      let miktar = args[1]
      if(args[1] == "sıfırla"){
        db.delete(`ayarlar.${message.guild.id}.rolklim`)
        message.channel.send("Başarıyla rolkoruma limiti sıfırlandı!")
        return;
      }
      if(!miktar) return message.reply("Hm, sanırım bir değer belirtmen lazım.")
      if(isNaN(miktar)) return message.reply("Hm, sanırım **tam sayı** bir değer belirtmen lazım.")
      if(miktar <= 0) return message.reply("Hm, sanırım **pozitif** bir değer belirtmen lazım.")
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.rolklim`)
      if(kontrol == miktar) return message.reply("Limiti aynı limit ile değiştiremezsin!")
      db.set(`ayarlar.${message.guild.id}.rolklim`, miktar)
      message.channel.send("Başarıyla limit "+miktar+" olarak güncellendi!")
      return;
    } else if(args[0] == "izinli"){
      if(args[1] == "ekle"){
      let rol = message.mentions.roles.first()
      if(!rol) return message.reply("Hm, sanırım bir rol etiketlemen lazım.")
      
      let a = await db.fetch(`ayarlar.${message.guild.id}.rolkistisna`)
      if(!a){
      db.push(`ayarlar.${message.guild.id}.rolkistisna`, rol.id)
      message.channel.send("Başarıyla "+rol+" istisna rollere eklendi!")
      return; 
      }
      else{
        let kontrol;
        a.forEach(x=>{
          if(rol.id === x) return kontrol = "var"
          else return kontrol = "yok"
        })
      if(kontrol == "var") return message.reply("Hey, zaten bu rol ekli!")
      db.push(`ayarlar.${message.guild.id}.rolkistisna`, rol.id)
      message.channel.send("Başarıyla "+rol+" istisna rollere eklendi!")
      return;
      }
      } else if(args[1] == "sil"){
      let rol = message.mentions.roles.first()
      if(!rol) return message.reply("Hm, sanırım bir rol etiketlemen lazım.")
      
      let a = await db.fetch(`ayarlar.${message.guild.id}.rolkistisna`)
      if(!a){
      message.channel.send("Hey, zaten hiç istisna rolü yok!")
      return; 
      }
      else{
        let kontrol;
        a.forEach(x=>{
          if(rol.id === x) return kontrol = "yok"
        })
      if(kontrol === "yok") {
        let yeni = []
        let say = 0
        a.forEach(x=>{
          say++
          if(rol.id == x) return;
          else return yeni.push(x)
        })
        if(say == 1) db.delete(`ayarlar.${message.guild.id}.rolkistisna`)
        else{
          db.set(`ayarlar.${message.guild.id}.rolkistisna`, yeni)
            }
      
      message.channel.send("Başarıyla "+rol+" istisna rollerden silindi!")
      return;
      }else return message.reply("Hey, zaten bu rol ekli değil!")
      }
      }else{
        message.channel.send("Heeey, sadece; `ekle, sil` adında değerler belirtebilirsin!")
      }
    } else if(args[0] == "yönetici"){ 
      if(args[1] == "aç"){
      let ak22 = await db.fetch(`ayarlar.${message.guild.id}.aktify`)
      if(ak22 == "Açık") return message.reply("Bu koruma zaten aktif!")
      else{
        message.channel.send("Koruma başarıyla aktif edildi!")
        db.set(`ayarlar.${message.guild.id}.aktify`, "Açık")
        return;
      }
    } else if(args[1] == "kapat"){
      let ak23 = await db.fetch(`ayarlar.${message.guild.id}.aktify`)
      if(ak23 == "Kapalı" || !ak23) return message.reply("Bu koruma zaten deaktif!")
      else{
        message.channel.send("Koruma başarıyla deaktif edildi!")
        db.delete(`ayarlar.${message.guild.id}.aktify`)
        return;
      }
    } else  message.channel.send("Heeey, sadece; `aç, kapat` adında değerler belirtebilirsin!")
  } else {
      message.channel.send("Heeey, sadece; `aç, kapat, log, limit, izinli, yönetici` adında değerler belirtebilirsin!")
    }
  }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rolkoruma"],
  permLevel: 3
};

exports.help = {
  name: "rol-koruma",
  description:
    "Türkçe Rol-Koruma Komutu. Detaylı bilgi için -prefix-rol-koruma-sistemi",
  usage: `-prefix-rol-koruma`
};
