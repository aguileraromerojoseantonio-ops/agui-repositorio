const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Bienvenido a AguiMusicBot 🎵');
});

// /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Usa /play para buscar música');
});
