const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

// ====== CONFIG ======
const app = express();
const PORT = process.env.PORT || 3000;

// Store start time for uptime calculation
global.botStartTime = Date.now();

// Example bot data (replace with real values in your bot)
global.connectedUsers = ["2348146627582@s.whatsapp.net"]; // This will be updated in your bot code
global.botCommands = [
    "!help or !menu - Show all commands",
    "!ping - Check bot speed",
    "!alive - Check if bot is running",
    "!tts <text> - Convert text to speech",
    "!owner - Show bot owner info",
    "!joke - Get a random joke",
    "!quote - Get a random quote",
    "!fact - Get a random fact",
    "!weather <city> - Get weather info",
    "!news - Get latest news",
    "!attp <text> - Animated text to picture",
    "!lyrics <song title> - Get song lyrics",
    "!8ball <question> - Ask the magic 8-ball",
    "!groupinfo - Show group information",
    "!staff or !admins - List group admins",
    "!vv - View once media",
    "!trt <text> <lang> - Translate text",
    "!ss <link> - Take a screenshot of a link",
    "!jid - Show your JID"
];

// ====== MIDDLEWARE ======
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// ====== LOGIN ROUTES ======
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password123') {
        req.session.user = username;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid login. <a href="/">Try again</a>');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// ====== API ENDPOINT ======
app.get('/stats', (req, res) => {
    const uptimeMs = Date.now() - global.botStartTime;
    const seconds = Math.floor((uptimeMs / 1000) % 60);
    const minutes = Math.floor((uptimeMs / (1000 * 60)) % 60);
    const hours = Math.floor((uptimeMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
    const formattedUptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    res.json({
        uptime: formattedUptime,
        connectedUsers: global.connectedUsers,
        commands: global.botCommands
    });
});

// ====== START SERVER ======
app.listen(PORT, () => {
    console.log(`✅ᴊꜰx ᴍᴅ-xᴠ2 ɪꜱ ʀᴜɴɴɪɴɢ/ ᴜꜱᴇ ᴛʜᴇ ᴅᴏᴍᴀɪɴ ᴛᴏ ᴠɪᴇᴡ /http://localhost:${PORT}`);
});
