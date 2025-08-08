const moment = require('moment-timezone');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://api.github.com/repos/Jeffreyfx1/jfx-md-x-v2');
    if (!res.ok) throw new Error('Error fetching repository data');
    const json = await res.json();

    let txt = `*🏴‍☠ ᴊꜰx ᴍᴅ-x 🏴‍☠*\n\n`;
    txt += `⪩⪨  *ɴᴀᴍᴇ* : ${json.name}\n`;
    txt += `⪩⪨  *ᴡᴀᴛᴄʜᴇʀꜱ* : 3000\n`;
    txt += `⪩⪨  *ꜱɪᴢᴇ* : ${(json.size / 1024).toFixed(2)} MB\n`;
    txt += `⪩⪨  *ʟᴀꜱᴛ ᴜᴘᴅᴀᴛᴇᴅ* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`;
    txt += `⪩⪨  *ᴜʀʟ* : ${json.html_url}\n`;
    txt += `⪩⪨  *ꜰᴏʀᴋꜱ* : 700\n`;
    txt += `⪩⪨  *ꜱᴛᴀʀꜱ* : 50000\n\n`;
    txt += `💥 *ᴊꜰx ᴍᴅ-x*`;

    const imgPath = path.join(__dirname, '../assets/bot_image.jpg');
    const imgBuffer = fs.readFileSync(imgPath);

    await sock.sendMessage(chatId, { image: imgBuffer, caption: txt }, { quoted: message });

    // 🔊 Send audio response
    const audioBuffer = fs.readFileSync('./audio/repo.mp3');
    await sock.sendMessage(chatId, {
      audio: audioBuffer,
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: message });

  } catch (error) {
    await sock.sendMessage(chatId, { text: '❌ Error fetching repository information.' }, { quoted: message });
  }
}

module.exports = githubCommand;
