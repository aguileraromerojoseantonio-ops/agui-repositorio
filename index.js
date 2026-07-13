const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Bienvenido 🚀');
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Comandos disponibles');
});
