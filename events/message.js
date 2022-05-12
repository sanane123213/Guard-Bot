const ayarlar = require("../ayarlar.json");
let beklememesaji;
const db = require("quick.db");
const sure = 5;
const sahipbeklemesi = true;
let yazma = new Set();

module.exports = async message => {
  let prefix = "!"
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
    if (yazma.has(message.author.id)) {
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
      if (kontrol == "tr_TR")
        beklememesaji =
          `Bu komutu kullanabilmek için 5 saniye kadar beklemelisin!`;
      else if (kontrol == "en_US")
        beklememesaji =
          `You must wait 5 seconds before you can use this command!`;

      return message.channel.send(beklememesaji);
    }
  } else if (client.aliases.has(command)) {
    if (yazma.has(message.author.id)) {
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
      if (kontrol == "tr_TR")
        beklememesaji =
          `Bu komutu kullanabilmek için 5 saniye kadar beklemelisin!`;
      else if (kontrol == "en_US")
        beklememesaji =
          `You must wait 5 seconds before you can use this command!`;
      return message.channel.send(beklememesaji);
    }
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) {
     let sonuç;
      let kontrol = await db.fetch(`ayarlar.${message.guild.id}.dil`) || "en_US";
      if(kontrol == "tr_TR"){
      if(cmd.conf.permLevel == 1) sonuç = "Bu komutu kullanabilmek için; **ÜYELERİ AT** yetkisine sahip olmanız lazım!"
      if(cmd.conf.permLevel == 2) sonuç = "Bu komutu kullanabilmek için; **ÜYELERİ YASAKLA** yetkisine sahip olmanız lazım!"
      if(cmd.conf.permLevel == 3) sonuç = "Bu komutu kullanabilmek için; **YÖNETİCİ** yetkisine sahip olmanız lazım!"
      if(cmd.conf.permLevel == 4) sonuç = "Bu komut sadece **BOT SAHİBİNE** özeldir!"
      } else if(kontrol == "en_US"){
      if(cmd.conf.permLevel == 1) sonuç = "In order to use this command; You must have the **KICK MEMBERS**!"
      if(cmd.conf.permLevel == 2) sonuç = "In order to use this command; You must have the **BAN MEMBERS**!"
      if(cmd.conf.permLevel == 3) sonuç = "In order to use this command; You must have the **ADMINISTRATOR**!"
      if(cmd.conf.permLevel == 4) sonuç = "This command is exclusive to **BOT OWNER** only!"
      }
      message.channel.send(sonuç)
      return;
      }
    if(cmd.conf.guildOnly == true){
      if(message.channel.type != "text") {
      let sonuç = "This command is only available on servers!"
      message.channel.send(sonuç)
      return;
      } else {
        cmd.run(client, message, params, perms);
        return;
      }
    }
    if (sahipbeklemesi === false) {
      yazma.add(message.author.id);
    }
    if (sahipbeklemesi === true) {
      if (message.author.id === ayarlar.sahip) {
        cmd.run(client, message, params, perms);
        return true;
      }
    }
    setTimeout(() => {
      if (yazma.has(message.author.id)) {
        yazma.delete(message.author.id);
      }
    }, sure * 1000);
    cmd.run(client, message, params, perms);
  }
};
