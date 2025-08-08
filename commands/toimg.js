const { spawn } = require('child_process');
const util = require('util');

async function toimgCommand(sock, chatId, m, args) {
  if (!global.support.convert && !global.support.magick && !global.support.gm) {
    await sock.sendMessage(chatId, { text: '❌ ɴᴏ ɪᴍᴀɢᴇ ᴄᴏɴᴠᴇʀᴛᴇʀ ꜱᴜᴘᴘᴏʀᴛᴇᴅ ᴏɴ ʏᴏᴜʀ ʜᴏꜱᴛ.' }, { quoted: m });
    return;
  }

  if (!m.quoted || m.quoted.mtype !== 'stickerMessage') {
    await sock.sendMessage(chatId, { text: '⚠️ ᴛᴀɢ ᴀ ꜱᴛɪᴄᴋᴇʀ ᴛᴏ ᴄᴏɴᴠᴇʀᴛ ɪᴛ ᴛᴏ ɪᴍᴀɢᴇ.' }, { quoted: m });
    return;
  }

  try {
    let q = { message: { [m.quoted.mtype]: m.quoted } };
    let stickerBuffer = await sock.downloadM(q);
    if (!stickerBuffer) throw '❌ ꜱᴛɪᴄᴋᴇʀ ᴅᴏᴡɴʟᴏᴀᴅ ꜰᴀɪʟᴇᴅ.';

    let bufs = [];
    const [_cmd, ..._args] = [
      ...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
      'convert',
      'webp:-',
      'png:-'
    ];

    let process = spawn(_cmd, _args);

    process.on('error', async (e) => {
      await sock.sendMessage(chatId, { text: '❌ ᴄᴏɴᴠᴇʀᴛ ᴇʀʀᴏʀ:\n' + util.format(e) }, { quoted: m });
    });

    process.stdout.on('data', (chunk) => bufs.push(chunk));
    process.stdin.write(stickerBuffer);
    process.stdin.end();

    process.on('close', async () => {
      const imageBuffer = Buffer.concat(bufs);
      await sock.sendMessage(chatId, {
        image: imageBuffer,
        caption: '🖼️ ꜱᴛɪᴄᴋᴇʀ ᴄᴏɴᴠᴇʀᴛᴇᴅ ᴛᴏ ɪᴍᴀɢᴇ.'
      }, { quoted: m });
    });
  } catch (err) {
    console.error(err);
    await sock.sendMessage(chatId, { text: '❌ ᴜɴᴀʙʟᴇ ᴛᴏ ᴘʀᴏᴄᴇꜱꜱ ꜱᴛɪᴄᴋᴇʀ.' }, { quoted: m });
  }
}

module.exports = toimgCommand;
