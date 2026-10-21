const http = require('http');
const mineflayer = require('mineflayer');
const fs = require('fs');

// 1. Keep Render Free Tier alive with a health-check HTTP server
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 3000);

// 2. Function to start the Minecraft bot
function createBot() {
  const host = "Aarav1hgc.aternos.me";
  const port = 25565;
  const username = "PerzaanAFK";

  console.log(`Attempting to connect to ${host}:${port} as ${username}...`);

  const bot = mineflayer.createBot({
    host: host,
    port: port,
    username: username,
    version: false
  });

  bot.on('spawn', () => {
    console.log("Bot has successfully spawned into the server!");
  });

  bot.on('error', (err) => {
    console.log("Bot error: ", err);
  });

  bot.on('end', () => {
    console.log("Bot disconnected. Reconnecting in 5 seconds...");
    setTimeout(() => {
      createBot();
    }, 5000);
  });
}

// ===================================================
// CRASH RECOVERY
// ===================================================
process.on('uncaughtException', (err) => {
  console.log(`[FATAL] Uncaught Exception: ${err.message}`);
});

process.on('unhandledRejection', (reason) => {
  console.log(`[FATAL] Unhandled Rejection: ${reason}`);
});

// ===================================================
// START THE BOT
// ===================================================
console.log('='.repeat(50));
console.log('  Minecraft AFK Bot v2 - Running on Render  ');
console.log('='.repeat(50));

createBot();
