console.log('ꜱᴛᴀʀᴛɪɴɢ ʙᴏᴛ...');

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const pkg = require('./package.json');
const CFonts = require('cfonts');

// Fancy banner for JFX MD-X
CFonts.say('JFX MD-X', {
  font: 'block',
  align: 'center',
  colors: ['cyan'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '0',
  gradient: ['cyan', 'blue'],
});

CFonts.say(`'${pkg.name}' ꜱᴛᴀʀᴛᴇᴅ ʙʏ @${pkg.author.name || pkg.author}`, {
  font: 'console',
  align: 'center',
  colors: ['white'],
  background: 'transparent',
});

// Flag to prevent double run
let isRunning = false;

function start(file) {
  if (isRunning) return;
  isRunning = true;

  const args = [path.join(__dirname, file), ...process.argv.slice(2)];

  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  });

  // Listen for messages from child process
  p.on('message', data => {
    console.log('ꜰʀᴏᴍ ʙᴏᴛ:', data);
    if (data === 'reset') {
      p.kill();
      isRunning = false;
      start(file);
    }
    if (data === 'uptime') {
      p.send(process.uptime());
    }
  });

  // Restart on crash
  p.on('exit', code => {
    isRunning = false;
    console.error('ʙᴏᴛ ᴇxɪᴛᴇᴅ ᴡɪᴛʜ ᴄᴏᴅᴇ:', code);
    if (code !== 0) {
      fs.watchFile(args[0], () => {
        fs.unwatchFile(args[0]);
        start(file);
      });
    }
  });
}

// 📌 Start your main bot file
start('index.js'); // Change this if your main file has a different name
