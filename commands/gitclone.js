// commands/gitClone.js
const fetch = require('node-fetch');
const { TinyFont } = require('../lib/myfunc');

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

module.exports = async function gitCloneCommand(sock, chatId, message, args) {
    const url = args[0];

    if (!url) {
        await sock.sendMessage(chatId, {
            text: TinyFont('where is the github link? example: https://github.com/nexusNw/Deku')
        }, { quoted: message });
        return;
    }

    if (!regex.test(url)) {
        await sock.sendMessage(chatId, {
            text: TinyFont('wrong link!')
        }, { quoted: message });
        return;
    }

    let [, user, repo] = url.match(regex) || [];
    repo = repo.replace(/.git$/, '');
    const zipUrl = `https://api.github.com/repos/${user}/${repo}/zipball`;

    try {
        const res = await fetch(zipUrl, { method: 'HEAD' });
        const filename = res.headers.get('content-disposition')?.match(/filename=(.*)/)?.[1] || `${repo}.zip`;

        await sock.sendMessage(chatId, {
            text: TinyFont('ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ...')
        }, { quoted: message });

        await sock.sendMessage(chatId, {
            document: { url: zipUrl },
            fileName: filename,
            mimetype: 'application/zip'
        }, { quoted: message });

    } catch (error) {
        await sock.sendMessage(chatId, {
            text: TinyFont('ꜰᴀɪʟᴇᴅ ᴛᴏ ꜰᴇᴛᴄʜ ꜰɪʟᴇ ❌')
        }, { quoted: message });
    }
};
