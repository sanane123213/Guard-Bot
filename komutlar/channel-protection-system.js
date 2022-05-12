const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let kontrol = (await db.fetch(`ayarlar.${message.guild.id}.dil`)) || "en_US";
  if (kontrol !== "en_US") return;
  let prefix = (await db.fetch(`ayarlar.${message.guild.id}.prefix`)) || "!";

  const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setTitle(ayarlar.botadı + "! | English Channel-Protection System Menu")
    .addField(
      `What's this; "channel-protection" system?`,
      `**Thanks to this system; you can get a high level of channel protection on your server.**\n\nCommands within the system;\n\`${prefix}channel-protection\` = **Lists channel-protection settings.**\n\n\`${prefix}channel-protection <on-off>\` = **It is used to turn on-off channel-protection.**\n\n\`${prefix}channel-protection authorized\` = **Roles added to the official; it is perceived by the system, if there is a limit, it counts the limit but it still falls into the log.**\n\n\`${prefix}channel-protection authorized <add-remove> <@Role>\` = **Authorized roles are roles to be counted on. Use this command to add or remove them.**\n\n\`${prefix}channel-protection log <#Channel/reset>\` = **When someone deletes / adds roles, it causes the information to fall into the log.**\n\n\`${prefix}channel-protection limit <Limit/reset>\` = **It is a necessary setting for permitted roles, if it is active, it counts the limit and goes directly to the action you selected.**`
    )
    .setFooter(ayarlar.botadı + "! | Daima Hizmet!")
    .setTimestamp();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["channelprotection-system"],
  permLevel: 0
};

exports.help = {
  name: "channel-protection-system",
  description: "English Channel-Protection System Menu",
  usage: `-prefix-channel-protection-system`
};
