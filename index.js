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
