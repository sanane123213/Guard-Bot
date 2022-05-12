const Discord = require("discord.js");
const bot = new Discord.Client();
const express = require("express");
const ayarlar = require("./ayarlar.json")
const app = express();
const http = require("http");
const coderlab = new Discord.ShardingManager("./server.js", {
  totalShards: 1,
  token: ayarlar.token
});

coderlab.spawn();

coderlab.on("launch", shard => {
  console.log(`${shard.id} id.`);

});

setTimeout(() => {
  coderlab.broadcastEval("process.exit()");
}, 21600000);