// commands/autorespond.js
const fs = require('fs');

async function autorespond(sock, message, chatId, senderId, isGroup, isBot, isBroadcast, isBlocked) {
    if (isBlocked || isBot || isBroadcast) return;

    const db = global.db;
    const conn = sock;

    const setting = db?.data?.settings[conn.user.jid] || {};
    const chat = db?.data?.chats[chatId] || {};
    const user = db?.data?.users[senderId] || {};

    // 🧷 Bot mentioned in group
    if (isGroup && message?.message?.extendedTextMessage?.contextInfo?.mentionedJid?.includes(conn.user.jid)) {
        await conn.sendMessage(chatId, {
            text: chat.isBanned ? 'Bot is inactive.' : user.banned ? 'You are banned.' : 'Bot here!',
            buttons: [
                {
                    buttonId: chat.isBanned ? '.unban' : user.banned ? '.owner' : '.menu',
                    buttonText: { displayText: chat.isBanned ? 'Unban' : user.banned ? 'Owner' : 'Menu' },
                    type: 1,
                },
                {
                    buttonId: '.owner',
                    buttonText: { displayText: 'Support' },
                    type: 1,
                },
            ],
            footer: '© Bot',
        }, { quoted: message });
    }

    // 📨 Invite links in private
    const text = message?.message?.conversation || message?.message?.extendedTextMessage?.text || '';
    if (!isGroup && (message.message?.groupInviteMessage || text.startsWith('https://chat') || text.includes('Open this link'))) {
        await conn.sendMessage(chatId, {
            text: `🚪 Invite Bot to Group:

Use .join [group link] to add me.

GitHub: https://github.com/nexusNw/Deku`,
            buttons: [
                {
                    buttonId: '.owner',
                    buttonText: { displayText: 'Owner' },
                    type: 1,
                },
            ],
            footer: '© Bot',
        }, { quoted: message });
    }

    // 💾 Auto DB backup
    if (setting.backup && Date.now() - setting.backupDB > 3600000) {
        const d = new Date();
        const date = d.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
        await global.db.write();
        await conn.sendMessage(global.owner[0] + '@s.whatsapp.net', { text: `📦 Database Backup: ${date}` });
        await conn.sendMessage(global.owner[0] + '@s.whatsapp.net', {
            document: fs.readFileSync('./database.json'),
            fileName: 'database.json',
            mimetype: 'application/json',
        });
        setting.backupDB = Date.now();
    }

    // ⏱️ Status update
    if (Date.now() - setting.status > 1000) {
        const uptime = clockString(process.uptime() * 1000);
        await conn.sendPresenceUpdate('available', conn.user.id);
        await conn.sendMessage(conn.user.id, {
            status: `🤖 Uptime: ${uptime} | Mode: ${global.opts.self ? 'Private' : setting.groupOnly ? 'Group Only' : 'Public'}`
        });
        setting.status = Date.now();
    }
}

function clockString(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor(ms / 60000) % 60;
    const s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

module.exports = autorespond;
