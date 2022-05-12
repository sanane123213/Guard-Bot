const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json");
module.exports.run = async (client, message, args) => {
    let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol !== "en_US") return;
let values = await client.shard.broadcastEval(`
    [
        this.shard.id,
        this.guilds.size,
        this.users.size,
        this.ping,
        (process.memoryUsage().heapUsed / 1024 / 1024)
    ]
`);
const embed = new Discord.RichEmbed()
.setColor("#7289DA")
.setFooter("❤️ symbolizes the shard you are!", client.user.avatarURL)
values.forEach((value) => {
  let kontrolke = ""
  if(client.shard.id == value[0]) kontrolke = " (❤️)"
    embed.addField(`• ${value[0]+1}. Shard${kontrolke}`, `**Shard Servers:** ${value[1]}\n**Shard Users:** ${value[2]}\n**Shard Ping:** ${value[3].toFixed(2)}MS\n**Ram:** ${value[4].toFixed(2)}MB`, true)
});
message.channel.send(embed);

};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["shardinfo"],
  permLevel: 0
};

module.exports.help = {
  name: "shard-info",
  description: "Shard info.",
  usage: "-prefix-shard-info"
};
