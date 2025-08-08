let handler = async (m, { conn, args }) => {
  let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;
  try {
    let online = [...Object.keys(conn.chats.get(id).presences), conn.user.jid];
    conn.reply(
      m.chat,
      '┌─〔 ʟɪꜱᴛ ᴏɴʟɪɴᴇ 〕\n' + online.map(v => '├ @' + v.replace(/@.+/, '')).join('\n') + '\n└────',
      m,
      {
        contextInfo: { mentionedJid: online }
      }
    );
  } catch (e) {
    m.reply('ɴᴏ ᴏɴʟɪɴᴇ ᴅᴀᴛᴀ ꜰᴏᴜɴᴅ ᴏʀ ɴᴏᴛ ɪɴ ᴀ ɢʀᴏᴜᴘ.');
  }
};

handler.help = ['here', 'online'];
handler.tags = ['group'];
handler.command = /^(here|(list)?online)$/i;

module.exports = handler;
