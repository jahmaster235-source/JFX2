const fs = require('fs');

function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor(daysms / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor(hoursms / (60 * 1000));
    return `${days} DAYS ${hours} HOUR ${minutes} MINUTES`;
}

module.exports = {
    name: "groupinfo",
    description: "Show full group info with bot settings",
    category: "group",
    execute: async function (sock, m, { participants, groupMetadata }) {
        const getGroupAdmins = (participants) => {
            const admins = [];
            for (let i of participants) {
                if (i.admin) admins.push(i.id);
            }
            return admins;
        };

        let pp = './assets/bot_image.jpg';
        try {
            pp = await sock.profilePictureUrl(m.chat, 'image');
        } catch (e) { }

        const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, expired, descUpdate, stiker } = global.db.data.chats[m.chat];
        const groupAdmins = getGroupAdmins(participants);
        const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.split`@`[0]}`).join('\n');

        let caption = `
ꜱʜᴏᴡɪɴɢ ɢʀᴏᴜᴘ ɪɴꜰᴏ ʙᴇʟᴏᴡ

📛 *ɴᴀᴍᴇ:* 
${groupMetadata.subject}

🆔 *ɢʀᴏᴜᴘ ɪᴅ:* 
${groupMetadata.id}

📝 *ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ:* 
${groupMetadata.desc || 'No description'}

👥 *ᴍᴇᴍʙᴇʀꜱ:* 
${participants.length} ᴛᴏᴛᴀʟ

👑 *ᴄʀᴇᴀᴛᴏʀ:* 
@${m.chat.split`-`[0]}

🛡️ *ᴀᴅᴍɪɴꜱ:* 
${listAdmin}

⚙️ *ʙᴏᴛ ꜱᴇᴛᴛɪɴɢꜱ:* 
🔗 Anti Link: ${antiLink ? '✅' : '❌'}
🗑 Anti Delete: ${global.db.data.chats[m.chat].delete ? '❌' : '✅'}
🚫 Banned: ${isBanned ? '✅' : '❌'}
📢 Desc Update: ${descUpdate ? '✅' : '❌'}
👁 Detect: ${detect ? '✅' : '❌'}
🖼 Sticker Welcome: ${stiker ? '✅' : '❌'}
🙋 Welcome: ${welcome ? '✅' : '❌'}

📝 *ᴍᴇꜱꜱᴀɢᴇꜱ:* 
👋 Welcome: ${sWelcome || '-'}
👋 Bye: ${sBye || '-'}
🧑‍🎓 Promote: ${sPromote || '-'}
🧑‍🦯 Demote: ${sDemote || '-'}

⏳ *ᴇxᴘɪʀᴇꜱ ɪɴ:* 
${msToDate(expired - Date.now())}
        `.trim();

        let mentionedJid = groupAdmins.concat([`${m.chat.split`-`[0]}@s.whatsapp.net`]);

        await sock.sendMessage(m.chat, {
            image: { url: pp },
            caption,
            mentions: mentionedJid
        }, { quoted: m });
    }
};
