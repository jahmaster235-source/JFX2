async function getppCommand(sock, msg) {
    // Get the person you're replying to
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant;

    // If not replying to anyone, exit
    if (!quoted) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `❌ You need to reply to someone's message to get their profile picture.`,
        }, { quoted: msg });
        return;
    }

    try {
        const ppUrl = await sock.profilePictureUrl(quoted, 'image');
        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: ppUrl },
            caption: `🖼️ Profile picture of @${quoted.split('@')[0]}`,
            mentions: [quoted]
        }, { quoted: msg });
    } catch (err) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `❌ Couldn't fetch profile picture.`,
        }, { quoted: msg });
    }
}

module.exports = getppCommand;
