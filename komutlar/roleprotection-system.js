const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require('quick.db');
exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol !== "en_US") return;
let prefix = await db.fetch(`ayarlar.${message.guild.id}.prefix`) || "!";

    const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setTitle(ayarlar.botadı+"! | Türkçe Rol-Koruma Sistem Menüsü")
    .addField(`What is this; "role-protection" system?`, `**Thanks to this system; you can get a high level of role protection on your server.**\n\nCommands within the system;\n\`${prefix}role-protection\` = **Lists Role Protection settings.**\n\n\`${prefix}role-protection <on-off>\` = **To turn role protection on and off.**\n\n\`${prefix}role-protection authorized\` = **Authorized added roles; it is perceived by the system, if there is a limit, it counts the limit but it still falls into the log.**\n\n\`${prefix}rolkoruma authorized <add-delete> <@Role>\` = **Permitted roles are roles whose limit is counted. Use this command to add or remove them.**\n\n\`${prefix}role-protection log <#Channel/reset>\` = **Enables the system to log when someone deletes/adds roles.**\n\n\`${prefix}role-protection limit <Limit/reset>\` = **It is a necessary setting for authorized roles, if it is active it counts the limit, if not, it goes directly to the operation.**\n\n\`${prefix}role-protection administration <on-off>\` = **Thanks to this protection, no role can be given to any administration.**`)
    .setFooter(ayarlar.botadı+"! | Daima Hizmet!")
    .setTimestamp()
    message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["roleprotection-system"],
  permLevel: 0
};

exports.help = {
  name: "role-protection-system",
  description: "English Role-Protection System Menu",
  usage: `-prefix-role-protection-system`
};
