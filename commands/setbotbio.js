// commands/setbotbio.js
module.exports = {
  name: 'setbotbio',
  alias: [],
  category: 'owner',
  desc: 'Set the bot bio/status message',
  owner: true,
  async exec(sock, m, { text }) {
    if (!text) return m.reply("ꜱᴇɴᴅ ᴀ ʙɪᴏ ᴛᴇxᴛ.\nᴇxᴀᴍᴘʟᴇ:\n.setbotbio JFX MD-X ʙᴏᴛ ᴏɴʟɪɴᴇ ✅");
    try {
      await sock.sendPresenceUpdate('available'); // optional, to show online
      await sock.updateProfileStatus(text);
      m.reply("ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴜᴘᴅᴀᴛᴇᴅ ʙɪᴏ ✅");
    } catch (e) {
      console.error(e);
      m.reply("ғᴀɪʟᴇᴅ ᴛᴏ ᴜᴘᴅᴀᴛᴇ ʙɪᴏ ❌");
    }
  }
};
