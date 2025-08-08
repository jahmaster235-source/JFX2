// commands/loli18.js
const { TinyFont } = require('../lib/myfunc');

module.exports = async function loli18Command(sock, chatId, message) {
    const url = 'https://api.lolhuman.xyz/api/random/nsfw/loli?apikey=39f938655e624cb72a79560b';

    await sock.sendMessage(chatId, {
        image: { url },
        caption: TinyFont('ꜱᴀɴɢᴇ~ᴀɴ')
    }, { quoted: message });
};
