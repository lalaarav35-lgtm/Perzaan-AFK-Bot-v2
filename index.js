const http = require('http');
const mineflayer = require('mineflayer');
const fs = require('fs');

// 1. Keep Render Free Tier alive with a health check HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Bot is running!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`);
});

// 2. Function to start the Minecraft bot
function createBot() {
    const bot = mineflayer.createBot({
        host: "Aarav1hgc.aternos.me", // Updated from your Aternos dashboard
        port: 12216,                  // Updated port from your Aternos dashboard[cite: 2]
        username: "saidey_gandmara",  // Your requested bot name
        auth: "offline"             // Required for Aternos cracked servers
    });

    bot.on('spawn', () => {
        console.log("Bot has successfully spawned into the server!");
    });

    bot.on('error', (err) => {
        console.log("Bot error:", err);
    });

    bot.on('end', (reason) => {
        console.log(`Bot disconnected. Reason: ${reason}. Reconnecting in 5 seconds...`);
        setTimeout(() => {
            createBot();
        }, 5000);
    });
    
    bot.on('kick', (reason) => {
        console.log("Bot was kicked from the server:", reason);
    });
}

// ========================================
// CRASH RECOVERY
// ========================================
process.on('uncaughtException', (err) => {
    console.log('[FATAL] Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason) => {
    console.log('[FATAL] Unhandled Rejection:', reason);
});

// ========================================
// START THE BOT
// ========================================
console.log("Minecraft AFK Bot v2 running on Render");
createBot();
