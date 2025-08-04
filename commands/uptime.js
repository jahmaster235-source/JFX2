function formatUptime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

async function uptimeCommand(sock, chatId) {
    if (!global.botStartTime) global.botStartTime = Date.now();

    const uptimeMs = Date.now() - global.botStartTime;
    const formatted = formatUptime(uptimeMs);

    const start = Date.now();
    await sock.sendMessage(chatId, { text: '⚡ Pinging...' });
    const speed = Date.now() - start;

    const now = new Date();
    const timestamp = now.toLocaleString('en-NG', { timeZone: 'Africa/Lagos' });

    const reply = `
☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻
🤖 ᴊꜰx ᴍᴅ-ˣ ᴜᴘᴛɪᴍᴇ ꜱᴛᴀᴛᴜꜱ
☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻

☻ ☞ ⏱ ᴜᴘᴛɪᴍᴇ : ${formatted}  
☻ ☞ ⚡ ꜱᴘᴇᴇᴅ  : ${speed} ms  
☻ ☞ 🕒 ᴛɪᴍᴇ   : ${timestamp}  

☻ ☞ 🔥 ᴘᴏᴡᴇʀᴇᴅ ʙʏ *ᴊꜰx ᴛᴇᴄʜ ᴢᴏɴᴇ* ⚡
`.trim();


    await sock.sendMessage(chatId, { text: reply });
}

module.exports = uptimeCommand;
