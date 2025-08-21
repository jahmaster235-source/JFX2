const fs = require('fs');
const settings = require("../settings");

async function aliveCommand(sock, chatId, message) {
    try {
        const message1 =
`ᬐ༂᳆╭ 𝐉𝐅𝐗 𝐌𝐃-𝐗 𝐕2╮༂ᬐ

✅ *Status:* ᴏɴʟɪɴᴇ
🧩 *Mode:* ᴘᴜʙʟɪᴄ
🗂️ *Version:* ${settings.version}

┏━ 🌟 *Features* ━
┃ • ɢʀᴏᴜᴘ ᴍᴀɴᴀɢᴇᴍᴇɴᴛ
┃ • ᴀɴᴛɪʟɪɴᴋ ᴘʀᴏᴛᴇᴄᴛɪᴏɴ
┃ • ꜰᴜɴ ᴄᴏᴍᴍᴀɴᴅꜱ
┃ • ᴀɴᴅ ᴍᴏʀᴇ!
┗━━━━━━━━━━

📎 ᴛʏᴘᴇ *.menu* ꜰᴏʀ ꜰᴜʟʟ ᴄᴏᴍᴍᴀɴᴅ ʟɪꜱᴛ

ᬐ༂᳆╰𝐉𝐅𝐗 𝐌𝐃-𝐗 ╯༂ᬐ`;

        await sock.sendMessage(chatId, {
            text: message1,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420646690174@newsletter',
                    newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });

        // 🔊 Send audio response (kept exactly like your original flow)
        const audioBuffer = fs.readFileSync('./audio/alive.mp3');
        await sock.sendMessage(chatId, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: message });

    } catch (error) {
        console.error('Error in alive command:', error);
        await sock.sendMessage(chatId, { text: 'Bot is alive and running!' }, { quoted: message });
    }
}

module.exports = aliveCommand;
