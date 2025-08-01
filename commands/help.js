const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
⚠️ʙᴏᴛ ꜱʏꜱᴛᴇᴍ ᴏᴠᴇʀᴠɪᴇᴡ⚠️
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
⟟ ɴᴀᴍᴇ:  ${settings.botName || 'ᴊꜰx ᴍᴅ-x'}
⟟ ᴠᴇʀꜱɪᴏɴ:  ${settings.version || '2.0.8'}
⟟ ᴄʀᴇᴀᴛᴏʀ:  ${settings.botOwner || 'ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ'}
⟟ ʏᴏᴜᴛᴜʙᴇ:  ${global.ytch}



*ꜰᴜɴᴄᴛɪᴏɴꜱ ᴍᴇɴᴜ:*

⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
⚡ɢᴇɴᴇʀᴀʟ ᴄᴏᴍᴍᴀɴᴅꜱ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
✦ .help ᴏʀ .menu  
✦ .ping  
✦ .alive  
✦ .tts <ᴛᴇxᴛ>  
✦ .owner  
✦ .joke  
✦ .quote  
✦ .fact  
✦ .weather <ᴄɪᴛʏ>  
✦ .news  
✦ .attp <ᴛᴇxᴛ>  
✦ .lyrics <ꜱᴏɴɢ_ᴛɪᴛʟᴇ>  
✦ .8ball <ǫᴜᴇꜱᴛɪᴏɴ>  
✦ .groupinfo  
✦ .staff ᴏʀ .admins  
✦ .vv  
✦ .trt <ᴛᴇxᴛ> <ʟᴀɴɢ>  
✦ .ss <ʟɪɴᴋ>  
✦ .jid

⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
⚡ᴀᴅᴍɪɴ ᴄᴏᴍᴍᴀɴᴅꜱ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
✦ .ban @user  
✦ .promote @user  
✦ .demote @user  
✦ .mute <ᴍɪɴᴜᴛᴇꜱ>  
✦ .unmute  
✦ .delete ᴏʀ .del  
✦ .kick @user  
✦ .warnings @user  
✦ .warn @user  
✦ .antilink  
✦ .antibadword  
✦ .clear  
✦ .tag <ᴍᴇꜱꜱᴀɢᴇ>  
✦ .tagall  
✦ .chatbot  
✦ .resetlink  
✦ .welcome <ᴏɴ/ᴏꜰꜰ>  
✦ .goodbye <ᴏɴ/ᴏꜰꜰ>

⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
⚡ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅꜱ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
✦ .mode  
✦ .autostatus  
✦ .clearsession  
✦ .antidelete  
✦ .cleartmp  
✦ .setpp <ʀᴇᴘʟʏ ᴛᴏ ɪᴍᴀɢᴇ>  
✦ .autoreact

⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
⚡ɪᴍᴀɢᴇ/ꜱᴛɪᴄᴋᴇʀ ᴄᴏᴍᴍᴀɴᴅꜱ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
✦ .blur <ɪᴍᴀɢᴇ>  
✦ .simage <ʀᴇᴘʟʏ ᴛᴏ ꜱᴛɪᴄᴋᴇʀ>  
✦ .sticker <ʀᴇᴘʟʏ ᴛᴏ ɪᴍᴀɢᴇ>  
✦ .tgsticker <ʟɪɴᴋ>  
✦ .meme  
✦ .take <ᴘᴀᴄᴋɴᴀᴍᴇ>  
✦ .emojimix <ᴇᴍᴊ1>+<ᴇᴍᴊ2>

⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
⚡ɢᴀᴍᴇ ᴄᴏᴍᴍᴀɴᴅꜱ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
✦ .tictactoe @ᴜꜱᴇʀ  
✦ .hangman  
✦ .guess <ʟᴇᴛᴛᴇʀ>  
✦ .trivia  
✦ .answer <ᴀɴꜱᴡᴇʀ>  
✦ .truth  
✦ .dare

⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
⚡ᴀɪ ᴄᴏᴍᴍᴀɴᴅꜱ ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
✦ .gpt <ǫᴜᴇꜱᴛɪᴏɴ>  
✦ .gemini <ǫᴜᴇꜱᴛɪᴏɴ>  
✦ .imagine <ᴘʀᴏᴍᴘᴛ>  
✦ .flux <ᴘʀᴏᴍᴘᴛ>


⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
⚡ꜰᴜɴ ᴄᴏᴍᴍᴀɴᴅꜱ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
✦ .compliment @ᴜꜱᴇʀ  
✦ .insult @ᴜꜱᴇʀ  
✦ .flirt  
✦ .shayari  
✦ .goodnight  
✦ .roseday  
✦ .character @ᴜꜱᴇʀ  
✦ .wasted @ᴜꜱᴇʀ  
✦ .ship @ᴜꜱᴇʀ  
✦ .simp @ᴜꜱᴇʀ  
✦ .stupid @ᴜꜱᴇʀ [ᴛᴇxᴛ]



⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
⚡ᴛᴇxᴛᴍᴀᴋᴇʀ ᴄᴏᴍᴍᴀɴᴅꜱ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
✦ .metallic <ᴛᴇxᴛ>  
✦ .ice <ᴛᴇxᴛ>  
✦ .snow <ᴛᴇxᴛ>  
✦ .impressive <ᴛᴇxᴛ>  
✦ .matrix <ᴛᴇxᴛ>  
✦ .light <ᴛᴇxᴛ>  
✦ .neon <ᴛᴇxᴛ>  
✦ .devil <ᴛᴇxᴛ>  
✦ .purple <ᴛᴇxᴛ>  
✦ .thunder <ᴛᴇxᴛ>  
✦ .leaves <ᴛᴇxᴛ>  
✦ .1917 <ᴛᴇxᴛ>  
✦ .arena <ᴛᴇxᴛ>  
✦ .hacker <ᴛᴇxᴛ>  
✦ .sand <ᴛᴇxᴛ>  
✦ .blackpink <ᴛᴇxᴛ>  
✦ .glitch <ᴛᴇxᴛ>  
✦ .fire <ᴛᴇxᴛ>

⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
⚡ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
✦ .play <ꜱᴏɴɢ_ɴᴀᴍᴇ>
✦ .song <ꜱᴏɴɢ_ɴᴀᴍᴇ>
✦ .instagram <ʟɪɴᴋ>
✦ .facebook <ʟɪɴᴋ>
✦ .tiktok <ʟɪɴᴋ>
✦ .video <ꜱᴏɴɢ_ɴᴀᴍᴇ>
✦ .ytmp4 <ʟɪɴᴋ>

⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨
⚡ɢɪᴛʜᴜʙ ᴄᴏᴍᴍᴀɴᴅꜱ⚡
⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩⪨⪩
✦ .git
✦ .github
✦ .sc
✦ .script
✦ .repo



𝙅𝙤𝙞𝙣 𝙤𝙪𝙧 𝙘𝙝𝙖𝙣𝙣𝙚𝙡 𝙛𝙤𝙧 𝙪𝙥𝙙𝙖𝙩𝙚𝙨`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420646690174@newsletter',
                        newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
                        serverMessageId: -1
                    }
                }
            },{ quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '1203634206466901748@newsletter',
                        newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗 by ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ',
                        serverMessageId: -1
                    } 
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
