const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol !== "en_US") return;


  const DBL = require("dblapi.js");
  const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxODI1MDU5OTQ4NDg4MzAzNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkyNzc3ODgxfQ.Q1O0_q18EnYPaM4ctcQh7uvwRjaASs4tDktZbQmFi0I", client);
dbl.hasVoted(message.author.id).then(async voted => {
    if (voted) {


  var prefix =
    (await db.fetch(`ayarlar.${message.guild.id}.prefix`)) || ayarlar.prefix;
  if(!args[0]){
    let limit = await db.fetch(`ayarlar.${message.guild.id}.rolklim`) || 0
    let ak23 = await db.fetch(`ayarlar.${message.guild.id}.aktify`) || "Off"
  let log
  if(!await db.fetch(`ayarlar.${message.guild.id}.rolklog`)) log = "Unadjusted!"
  else log = `<#${(await db.fetch(`ayarlar.${message.guild.id}.rolklog`))}>`
  let roller = []
  let ak = await db.fetch(`ayarlar.${message.guild.id}.aktif`) || "Off"
  let a = await db.fetch(`ayarlar.${message.guild.id}.rolkistisna`)
  if(!a) roller.push("Unadjusted!")
  else{
    a.forEach(x => {
      roller.push(`<@&${x}>`)
    })
  }
  const embed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle(ayarlar.botadı+"! | English Role-Protection")
  .addField("Reactivity ("+prefix+"role-protection on-off)", ak.replace("Açık", "On"))
  .addField("Log Channel ("+prefix+"role-protection log <#Channel/reset>)", log)
  .addField("Role Delete Limit ("+prefix+"role-protection limit <Limit/reset>)", limit)
  .addField("Authorized Roles ("+prefix+"role-protection authorized add-delete <@Role>)", roller.join("-"))
  .addField("Administrator Protection ("+prefix+"role-protection administrator on-off)", ak23.replace("Açık", "On"))
  .setFooter(ayarlar.botadı+"! | Always Service!")
  .setTimestamp();
  message.channel.send(embed);
  }else{
    if(args[0] == "on"){
      let ak2 = await db.fetch(`ayarlar.${message.guild.id}.aktif`)
      if(ak2 == "Açık") return message.reply("This protection is already active!")
      else{
        message.channel.send("Protection was successfully activated!")
        db.set(`ayarlar.${message.guild.id}.aktif`, "Açık")
        return;
      }
    } else if(args[0] == "off"){
      let ak3 = await db.fetch(`ayarlar.${message.guild.id}.aktif`)
      if(ak3 == "Kapalı" || !ak3) return message.reply("This protection is already deactivated!")
      else{
        message.channel.send("Protection was successfully deactivated!")
        db.delete(`ayarlar.${message.guild.id}.aktif`)
        return;
      }
    }
    else if(args[0] == "log"){
      let çenıl = message.mentions.channels.first()
      if(args[1] == "reset"){
        db.delete(`ayarlar.${message.guild.id}.rolklog`)
        message.channel.send("The log channel has been successfully reset!")
        return;
      }
      if(!çenıl) return message.reply("Hm, I think you should tag a channel.")
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.rolklog`)
      if(kontrol == çenıl.id) return message.reply("You cannot replace the log channel with the same log channel!")
      db.set(`ayarlar.${message.guild.id}.rolklog`, çenıl.id)
      message.channel.send("Successfully updated log channel "+çenıl+"!")
      return;
    } else if(args[0] == "limit"){
      let miktar = args[1]
      if(args[1] == "reset"){
        db.delete(`ayarlar.${message.guild.id}.rolklim`)
        message.channel.send("Successful role protection limit has been reset!")
        return;
      }
      if(!miktar) return message.reply("Hm, I think you need to specify a value.")
      if(isNaN(miktar)) return message.reply("Hm, I think you need to specify **number** a value.")
      if(miktar <= 0) return message.reply("Hm, I think you need to specify a **positive** value.")
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.rolklim`)
      if(kontrol == miktar) return message.reply("You cannot change the limit to the same limit!")
      db.set(`ayarlar.${message.guild.id}.rolklim`, miktar)
      message.channel.send("Successfully updated to limit "+miktar)
      return;
    } else if(args[0] == "authorized"){
      if(args[1] == "add"){
      let rol = message.mentions.roles.first()
      if(!rol) return message.reply("Hm, I think you should tag a role.")
      
      let a = await db.fetch(`ayarlar.${message.guild.id}.rolkistisna`)
      if(!a){
      db.push(`ayarlar.${message.guild.id}.rolkistisna`, rol.id)
      message.channel.send("Successfully "+a+" added to authorized roles!")
      return; 
      }
      else{
        let kontrol;
        a.forEach(x=>{
          if(rol.id === x) return kontrol = "var"
          else return kontrol = "yok"
        })
      if(kontrol == "var") return message.reply("Hey, this role is already attached!")
      db.push(`ayarlar.${message.guild.id}.rolkistisna`, rol.id)
      message.channel.send("Successfully "+a+" added to authorized roles!")
      return;
      }
      } else if(args[1] == "delete"){
      let rol = message.mentions.roles.first()
      if(!rol) return message.reply("Hm, I think you should tag a role.")
      
      let a = await db.fetch(`ayarlar.${message.guild.id}.rolkistisna`)
      if(!a){
      message.channel.send("Hey, there is no already registered role in the system!")
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
      
      message.channel.send("Successfully "+rol+" deleted from authorized roles!")
      return;
      }else return message.reply("Hey, this role is not already attached!")
      }
      }else{
        message.channel.send("Heeey, just; You can specify values ​​named `add, delete`!")
      }
    } else if(args[0] == "administrator"){ 
      if(args[1] == "aç"){
      let ak22 = await db.fetch(`ayarlar.${message.guild.id}.aktify`)
      if(ak22 == "Açık") return message.reply("This protection is already active!")
      else{
        message.channel.send("Protection was successfully activated!")
        db.set(`ayarlar.${message.guild.id}.aktify`, "Açık")
        return;
      }
    } else if(args[1] == "kapat"){
      let ak23 = await db.fetch(`ayarlar.${message.guild.id}.aktify`)
      if(ak23 == "Kapalı" || !ak23) return message.reply("This protection is already deactivated!")
      else{
        message.channel.send("Protection was successfully deactivated!")
        db.delete(`ayarlar.${message.guild.id}.aktify`)
        return;
      }
    } else  message.channel.send("Heeey, just; You can specify values called `on, off`!")
  } else {
      message.channel.send("Heeey, just; You can specify values called `on, off, log, limit, authorized, administrator`!")
    }
  }
}
else{
message.channel.send("Hello my friend! You can use the command by voting our bot from this link (https://top.gg/bot/718250599484883035/vote)! We put this necessity to grow, good day. -Guard BOT team");
return;
}
})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["roleprotection"],
  permLevel: 3
};

exports.help = {
  name: "role-protection",
  description:
    "English Role-Protection Command. For detailed information; -prefix-role-protection-system",
  usage: `-prefix-role-protection`
};
