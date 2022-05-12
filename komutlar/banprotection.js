const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let kontrol = (await db.fetch(`ayarlar.${message.guild.id}.dil`)) || "en_US";
  if (kontrol !== "en_US") return;

  const DBL = require("dblapi.js");
  const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxODI1MDU5OTQ4NDg4MzAzNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkyNzc3ODgxfQ.Q1O0_q18EnYPaM4ctcQh7uvwRjaASs4tDktZbQmFi0I", client);
dbl.hasVoted(message.author.id).then(async voted => {
    if (voted) {


  var prefix =
    (await db.fetch(`ayarlar.${message.guild.id}.prefix`)) || ayarlar.prefix;
  if (!args[0]) {
    let ak = (await db.fetch(`ayarlar.${message.guild.id}.bankoruma`)) || "Off";
    let log =
      (await db.fetch(`ayarlar.${message.guild.id}.banlog`)) || "Unadjusted";
    let limit = (await db.fetch(`ayarlar.${message.guild.id}.banlimit`)) || 3;
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setTitle(ayarlar.botadı + "! | English Ban-Protection")
      .addField(
        "Reactive (" + prefix + "ban-protection <on-off>)",
        ak.replace("Açık", "On")
      )
      .addField(
        "Log Channel (" + prefix + "ban-protection log <#Channel/reset>)",
        log
      )
      .addField(
        "Ban Limit (" + prefix + "ban-protection limit <Limit/reset>)",
        limit
      )
      .setFooter(ayarlar.botadı + "! | Always Service!")
      .setTimestamp();
    message.channel.send(embed);
  } else {
    if (args[0] == "on") {
      let ak2 = await db.fetch(`ayarlar.${message.guild.id}.bankoruma`);
      if (ak2 == "Açık")
        return message.reply("This protection is already active!");
      else {
        message.channel.send("Protection was successfully activated!");
        db.set(`ayarlar.${message.guild.id}.bankoruma`, "Açık");
        return;
      }
    } else if (args[0] == "off") {
      let ak3 = await db.fetch(`ayarlar.${message.guild.id}.bankoruma`);
      if (ak3 == "Kapalı" || !ak3)
        return message.reply("This protection is already deactivated!");
      else {
        message.channel.send("Protection was successfully deactivated!");
        db.delete(`ayarlar.${message.guild.id}.bankoruma`);
        return;
      }
    } else if (args[0] == "log") {
      let çenıl = message.mentions.channels.first();
      if (args[1] == "reset") {
        db.delete(`ayarlar.${message.guild.id}.banlog`);
        message.channel.send("The log channel has been successfully reset!");
        return;
      }
      if (!çenıl) return message.reply("Hm, I think you should tag a channel.");
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.banlog`);
      if (kontrol == çenıl.id)
        return message.reply(
          "You cannot replace the log channel with the same log channel!"
        );
      db.set(`ayarlar.${message.guild.id}.banlog`, çenıl.id);
      message.channel.send(
        "Successfully updated log channel as " + çenıl + "!"
      );
      return;
    } else if (args[0] == "limit") {
      let miktar = args[1];
      if (args[1] == "reset") {
        db.delete(`ayarlar.${message.guild.id}.banlimit`);
        message.channel.send("Successfully reset the ban limit!");
        return;
      }
      if (!miktar)
        return message.reply("Hm, I think you need to specify a value.");
      if (isNaN(miktar))
        return message.reply(
          "Hm, I think you need to specify **integer** a value."
        );
      if (miktar <= 0)
        return message.reply(
          "Hm, I think you need to specify **pozitive** a value."
        );
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.banlimit`);
      if (kontrol == miktar)
        return message.reply("You cannot change the limit to the same limit!");
      db.set(`ayarlar.${message.guild.id}.banlimit`, miktar);
      message.channel.send("Successfully updated to the limit " + miktar + "!");
      return;
    } else
      message.channel.send(
        "Heeey, just; You can specify values called `on, off, log, limit`!"
      );
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
  aliases: ["banprotection"],
  permLevel: 3
};

exports.help = {
  name: "ban-protection",
  description:
    "English Ban-Protection Command. For Info: -prefix-ban-protection-system",
  usage: `-prefix-ban-protection`
};
