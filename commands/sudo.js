const { newMessagesDB } = require('@whiskeysockets/baileysn');

async function sudoCommand(sock, chatId, message, args, isGroup, sender) {
  if (!args || args.length === 0) {
    await sock.sendMessage(chatId, { text: '⚠️ ꜱᴇɴᴅ ᴀ ᴄᴏᴍᴍᴀɴᴅ ᴛᴏ ʀᴜɴ.' }, { quoted: message });
    return;
  }

  const text = args.join(' ');
  let target;

  if (isGroup) {
    const mentionedJid = message.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentionedJid || mentionedJid.length === 0) {
      await sock.sendMessage(chatId, { text: '⚠️ ᴛᴀɢ ᴀ ᴍᴇᴍʙᴇʀ ᴛᴏ ʀᴜɴ ᴄᴏᴍᴍᴀɴᴅ ᴀꜱ.' }, { quoted: message });
      return;
    }
    target = mentionedJid[0];
  } else {
    target = chatId;
  }

  const commandText = text.replace('@' + target.split('@')[0], '').trim();

  sock.ev.emit('messages.upsert', {
    messages: newMessagesDB([
      sock.cMod(chatId, message, commandText, target)
    ]),
    type: 'append',
  });

  await sock.sendMessage(chatId, { text: '✅ ꜱᴜᴅᴏ ᴄᴏᴍᴍᴀɴᴅ ꜱᴇɴᴛ.' }, { quoted: message });
}

module.exports = sudoCommand;
