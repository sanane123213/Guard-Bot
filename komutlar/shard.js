const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
module.exports.run = async (client, message, args) => {
    let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
if(kontrol !== "tr_TR") return;
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
.setFooter("❤️ olduğunuz shardı simgeler!", client.user.avatarURL)
values.forEach((value) => {
  let kontrolke = ""
  if(client.shard.id == value[0]) kontrolke = " (❤️)"
    embed.addField(`• ${value[0]+1}. Shard${kontrolke}`, `**Toplam Sunucu:** ${value[1]}\n**Toplam Kullanıcı:** ${value[2]}\n**Gecikme:** ${value[3].toFixed(2)}MS\n**Ram:** ${value[4].toFixed(2)}MB`, true)
});
message.channel.send(embed);

};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["shardbilgi"],
  permLevel: 0
};

module.exports.help = {
  name: "shard-bilgi",
  description: "Shardlar hakkında bilgi.",
  usage: "-prefix-shard-bilgi"
};
