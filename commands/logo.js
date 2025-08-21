const axios = require("axios");
const fs = require("fs");

const apilink2 = 'https://api-pink-venom.vercel.app';
const caption = `> 𝐁𝚈 ᴏꜰꜰɪᴄɪᴀʟ ᴊꜰx ᴍᴅ-xᴠ2`;

const logos = {
    1: 'https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html',
    2: 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html',
    3: 'https://en.ephoto360.com/create-a-blackpink-neon-logo-text-effect-online-710.html',
    4: 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html',
    5: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
    6: 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html',
    7: 'https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html',
    8: 'https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html',
    9: 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html',
    10: 'https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html',
    11: 'https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html',
    12: 'https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html',
    13: 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html',
    14: 'https://en.ephoto360.com/free-pubg-logo-maker-online-609.html',
    15: 'https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html',
    16: 'https://en.ephoto360.com/create-free-fire-facebook-cover-online-567.html',
    17: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
    18: 'https://en.ephoto360.com/create-online-typography-art-effects-with-multiple-layers-811.html',
    19: 'https://en.ephoto360.com/modern-gold-5-215.html',
    20: 'https://en.ephoto360.com/matrix-text-effect-154.html'
};

async function logoCommand(sock, chatId, message, userMessage, senderId) {
    try {
        const args = userMessage.split(" ");
        args.shift(); // remove ".logo"
        const q = args.join(" ");

        if (!q) {
            await sock.sendMessage(chatId, { 
                text: "❌ Usage: `.logo <text>`\n\nExample: `.logo JFX`" 
            }, { quoted: message });
            return;
        }

        let logoMsg = `*ᴏꜰꜰɪᴄɪᴀʟ ᴊꜰx ᴍᴅ-xᴠ2 𝐋𝐎𝐆𝐎*\n
╭───❮ *ʟᴏɢᴏ ᴍᴇɴᴜ* ❯───◆
│
│ *📝 ᴛᴇxᴛ:* ${q}
│
│ *🔢 ʀᴇᴘʟʏ ᴡɪᴛʜ ᴀ ɴᴜᴍʙᴇʀ:*
│
│ 1  | Black Pink
│ 2  | Black Pink 2
│ 3  | Black Pink 3
│ 4  | Naruto
│ 5  | Digital Glitch
│ 6  | Pixel Glitch
│ 7  | Comic Style
│ 8  | Neon Light
│ 9  | Free Bear
│ 10 | Devil Wings
│ 11 | Futuristic Technology
│ 12 | Silver 3D
│ 13 | 3D Paper Cut
│ 14 | Pubg 1
│ 15 | Pubg 2
│ 16 | Free Fire Cover
│ 17 | Text On Wet Glass
│ 18 | Typography
│ 19 | Modern Gold
│ 20 | Matrix
│
╰❮ʙʏ ᴏꜰꜰɪᴄɪᴀʟ ᴊꜰx ᴍᴅ-xᴠ2 ❯◆`;

        // use local file instead of URL
        const menuMsg = await sock.sendMessage(chatId, {
            image: { url: "./assets/bot_image.jpg" }, // <-- local image
            caption: logoMsg,
            contextInfo: { mentionedJid: [senderId] }
        }, { quoted: message });

        // Wait for reply
        sock.ev.on("messages.upsert", async (msgUpdate) => {
            try {
                const msg = msgUpdate.messages[0];
                if (!msg.message || !msg.message.extendedTextMessage) return;

                if (msg.message.extendedTextMessage.contextInfo?.stanzaId !== menuMsg.key.id) return;

                const selected = msg.message.extendedTextMessage.text.trim();
                const choice = parseInt(selected);
                if (isNaN(choice) || choice < 1 || choice > 20) {
                    await sock.sendMessage(chatId, { text: "❌ Invalid number. Reply with 1-20." }, { quoted: msg });
                    return;
                }

                const { data } = await axios.get(
                    `${apilink2}/api/logo?url=${logos[choice]}&name=${encodeURIComponent(q)}`
                );

                if (!data.result || !data.result.download_url) {
                    await sock.sendMessage(chatId, { text: "❌ Failed to generate logo." }, { quoted: msg });
                    return;
                }

                await sock.sendMessage(chatId, {
                    image: { url: data.result.download_url },
                    caption: caption
                }, { quoted: msg });

            } catch (err) {
                console.error("Logo Reply Handler Error:", err);
            }
        });

    } catch (err) {
        console.error("Logo Command Error:", err);
    }
}

module.exports = { logoCommand };
