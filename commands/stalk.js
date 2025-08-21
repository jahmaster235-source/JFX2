// commands/ttstalk.js
const axios = require("axios");

async function ttstalkCommand(sock, chatId, message, userMessage, senderId, channelInfo) {
    try {
        const args = userMessage.split(" ");
        args.shift(); // remove .tiktokstalk
        const q = args.join(" ");

        if (!q) {
            await sock.sendMessage(chatId, { 
                text: "❎ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴛɪᴋᴛᴏᴋ ᴜsᴇʀɴᴀᴍᴇ.\n\n*ᴇxᴀᴍᴘʟᴇ:* .tiktokstalk bunny",
                ...channelInfo
            }, { quoted: message });
            return;
        }

        const apiUrl = `https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status) {
            await sock.sendMessage(chatId, { 
                text: "❌ ᴜsᴇʀ ɴᴏᴛ ғᴏᴜɴᴅ. ᴘʟᴇᴀsᴇ ᴄʜᴇᴄᴋ ᴛʜᴇ ᴜsᴇʀɴᴀᴍᴇ ᴀɴᴅ ᴛʀʏ ᴀɢᴀɪɴ.",
                ...channelInfo 
            }, { quoted: message });
            return;
        }

        const user = data.data.user;
        const stats = data.data.stats;

        const profileInfo = `🎭 *ᴛɪᴋᴛᴏᴋ ᴘʀᴏғɪʟᴇ sᴛᴀʟᴋᴇʀ* 🎭

👤 *ᴜsᴇʀɴᴀᴍᴇ:* @${user.uniqueId}
📛 *ɴɪᴄᴋɴᴀᴍᴇ:* ${user.nickname}
✅ *ᴠᴇʀɪғɪᴇᴅ:* ${user.verified ? "ʏᴇs ✅" : "ɴᴏ ❌"}
📍 *ʀᴇɢɪᴏɴ:* ${user.region}
📝 *ʙɪᴏ:* ${user.signature || "ɴᴏ ʙɪᴏ ᴀᴠᴀɪʟᴀʙʟᴇ."}
🔗 *ʙɪᴏ ʟɪɴᴋ:* ${user.bioLink?.link || "ɴᴏ ʟɪɴᴋ ᴀᴠᴀɪʟᴀʙʟᴇ."}

📊 *sᴛᴀᴛɪsᴛɪᴄs:*
👥 *ғᴏʟʟᴏᴡᴇʀs:* ${stats.followerCount.toLocaleString()}
👤 *ғᴏʟʟᴏᴡɪɴɢ:* ${stats.followingCount.toLocaleString()}
❤️ *ʟɪᴋᴇs:* ${stats.heartCount.toLocaleString()}
🎥 *ᴠɪᴅᴇᴏs:* ${stats.videoCount.toLocaleString()}

📅 *ᴀᴄᴄᴏᴜɴᴛ ᴄʀᴇᴀᴛᴇᴅ:* ${new Date(user.createTime * 1000).toLocaleDateString()}
🔒 *ᴘʀɪᴠᴀᴛᴇ ᴀᴄᴄᴏᴜɴᴛ:* ${user.privateAccount ? "ʏᴇs 🔒" : "ɴᴏ 🌍"}

🔗 *ᴘʀᴏғɪʟᴇ ᴜʀʟ:* https://www.tiktok.com/@${user.uniqueId}
`;

        await sock.sendMessage(chatId, {
            image: { url: user.avatarLarger },
            caption: profileInfo
        }, { quoted: message });

    } catch (error) {
        console.error("❌ Error in TikTok stalk command:", error);
        await sock.sendMessage(chatId, { 
            text: "⚠️ ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ғᴇᴛᴄʜɪɴɢ ᴛɪᴋᴛᴏᴋ ᴘʀᴏғɪʟᴇ ᴅᴀᴛᴀ.",
            ...channelInfo 
        }, { quoted: message });
    }
}

module.exports = { ttstalkCommand };
