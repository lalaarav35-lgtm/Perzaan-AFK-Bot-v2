const http = require('http');
const protocol = require('https');

// Keep Render Free Tier alive with a health-check HTTP server
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 3000);

// Safe Discord Webhook Notification Block
if (typeof options !== 'undefined') {
  const req = protocol.request(options, (res) => {
    // console.log(`[Discord] Sent webhook: ${res.statusCode}`);
  });

  req.on('error', (e) => {
    console.log(`[Discord] Error sending webhook: ${e.message}`);
  });

  if (typeof payload !== 'undefined') {
    req.write(payload);
  }
  req.end();
}

// ===================================================
// CRASH RECOVERY - IMMORTAL MODE
// ===================================================

process.on('uncaughtException', (err) => {
  console.log(`[FATAL] Uncaught Exception: ${err.message}`);
  if (typeof botState !== 'undefined' && botState.errors) {
    botState.errors.push({ type: 'uncaught', message: err.message, time: Date.now() });
  }
  
  if (typeof config !== 'undefined' && config.utils && config.utils.auto_reconnect) {
    setTimeout(() => {
      if (typeof createBot === 'function') createBot();
    }, 5000);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(`[FATAL] Unhandled Rejection: ${reason}`);
  if (typeof botState !== 'undefined' && botState.errors) {
    botState.errors.push({ type: 'rejection', message: String(reason), time: Date.now() });
  }
});

process.on('SIGTERM', () => {
  console.log('[System] SIGTERM received. Graceful shutdown...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[System] Manual stop requested. Exiting...');
  process.exit(0);
});

// ===================================================
// START THE BOT
// ===================================================

console.log('='.repeat(50));
console.log('  Minecraft AFK Bot v2.3 - Bug Fix Edition  ');
console.log('='.repeat(50));

if (typeof createBot === 'function') {
  createBot();
}
const http = require('http');
const mineflayer = require('mineflayer');

// 1. Keep Render Free Tier alive with a health-check HTTP server
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 3000);

// 2. Function to start the Minecraft bot directly
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
