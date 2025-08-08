const fs = require('fs');
const path = require('path');
const settings = require('../settings');

async function ownerCommand(sock, chatId, message) {
    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${settings.botOwner}
TEL;waid=${settings.ownerNumber}:${settings.ownerNumber}
END:VCARD
`;

    // Send contact first
    await sock.sendMessage(chatId, {
        contacts: {
            displayName: settings.botOwner,
            contacts: [{ vcard }]
        },
    });

    // Prepare video path
    const videoPath = path.join(__dirname, '../video/owner.mp4');

    // Check if video exists before sending
    if (fs.existsSync(videoPath)) {
        await sock.sendMessage(chatId, {
            video: fs.readFileSync(videoPath),
            caption: `👑 ʙᴏᴛꜱ ᴘʀɪᴍᴇ.`,
            mimetype: 'video/mp4'
        }, { quoted: message });
    } else {
        await sock.sendMessage(chatId, {
            text: '⚠️ Owner video not found at /video/owner.mp4.',
        }, { quoted: message });
    }
}

module.exports = ownerCommand;
