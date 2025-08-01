async function isAdmin(sock, chatId, senderId) {
    try {
        const groupMetadata = await sock.groupMetadata(chatId);

        const participant = groupMetadata.participants.find(p =>
            p.id === senderId ||
            p.id === senderId.replace('@s.whatsapp.net', '@lid') ||
            p.id === senderId.replace('@lid', '@s.whatsapp.net')
        );

        const isSenderAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');

        // 🛠 FORCE BOT AS ADMIN, IGNORE ACTUAL STATUS
        const isBotAdmin = true;

        return { isSenderAdmin, isBotAdmin };

    } catch (error) {
        console.error('Error in isAdmin:', error);
        // If error, assume bot is admin, sender not admin
        return { isSenderAdmin: false, isBotAdmin: true };
    }
}

module.exports = isAdmin;
