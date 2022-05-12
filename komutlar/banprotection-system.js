const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let kontrol = (await db.fetch(`ayarlar.${message.guild.id}.dil`)) || "en_US";
  if (kontrol !== "en_US") return;
  let prefix = (await db.fetch(`ayarlar.${message.guild.id}.prefix`)) || "!";

  const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setTitle(ayarlar.botadı + "! | English Ban-Protection System Menu")
    .addField(
      `What's this; "ban-protection" system?`,
      `**Thanks to this system; you can get a high level of ban protection on your server.**\n\nCommands within the system;\n\`${prefix}ban-protection\` = **Lists ban-protection settings.**\n\n\`${prefix}ban-protection <on-off>\` = **It is used to turn on-off ban-protection.**\n\n\`${prefix}ban-protection log <#Channel/reset>\` = **When someone ban members, it causes the information to fall into the log.**\n\n\`${prefix}ban-protection limit <Limit/reset>\` = **Ban limit acts as a member ban limit.**`
    )
    .setFooter(ayarlar.botadı + "! | Always Service!")
    .setTimestamp();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banprotection-system"],
  permLevel: 0
};

exports.help = {
  name: "ban-protection-system",
  description: "English Ban-Protection System Menu",
  usage: `-prefix-ban-protection-system`
};
