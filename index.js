const TelegramBot = require('node-telegram-bot-api');

// Cargar el TOKEN desde Railway
const token = process.env.TOKEN;

// Crear el bot con polling
const bot = new TelegramBot(token, { polling: true });

// Mensaje de arranque
console.log("Bot iniciado correctamente.");

// Responder a cualquier mensaje
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "¡Hola! Tu bot está funcionando en Railway 😎");
});
