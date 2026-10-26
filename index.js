const http = require('http');
const mineflayer = require('mineflayer');

// 1. Keep Render Free Tier alive with a health check HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("Bot is running!\n");
});
server.listen(process.env.PORT || 3000);

// 2. Function to start the Minecraft bot
function createBot() {
  const host = 'Aarav1hgc.aternos.me';
  const port = 12216;
  const username = 'maal';

  console.log(`Attempting to connect to ${host}:${port} as ${username}...`);

  const bot = mineflayer.createBot({
    host: host,
    port: port,
    username: username,
    version: '1.20.2',            // Explicit version to prevent handshake drops
    checkTimeoutInterval: 60000   // Prevents false timeout disconnections (60 seconds)
  });

  bot.on('spawn', () => {
    console.log("Bot has successfully spawned into the server!");
  });

  bot.on('kicked', (reason) => {
    console.log("Bot was kicked from the server:", reason);
  });

  bot.on('error', (err) => {
    console.log("Bot error:", err);
  });

  bot.on('end', (reason) => {
    console.log(`Bot disconnected (${reason}). Reconnecting in 5 seconds...`);
    setTimeout(() => {
      createBot();
    }, 5000);
  });
}

// Crash Recovery
process.on('uncaughtException', (err) => {
  console.log('[FATAL] Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.log('[FATAL] Unhandled Rejection:', reason);
});

// START THE BOT
console.log("---");
console.log("Minecraft AFK Bot v2 - Running on Render");
console.log("---");

createBot();
