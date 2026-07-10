const { Client, GatewayIntentBits } = require("discord.js");
const { 
  joinVoiceChannel, 
  createAudioPlayer, 
  createAudioResource, 
  AudioPlayerStatus 
} = require("@discordjs/voice");
const play = require("play-dl");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Bot conectado como: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("!play")) return;

  const query = message.content.replace("!play ", "").trim();

  if (!query) {
    return message.reply("Escribe el nombre de la canción o un enlace.");
  }

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply("Debes estar en un canal de voz.");
  }

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: message.guild.id,
    adapterCreator: message.guild.voiceAdapterCreator
  });

  const player = createAudioPlayer();

  try {
    const search = await play.search(query, { limit: 1 });
    const stream = await play.stream(search[0].url);

    const resource = createAudioResource(stream.stream, {
      inputType: stream.type
    });

    player.play(resource);
    connection.subscribe(player);

    message.reply(`🎶 Reproduciendo: **${search[0].title}**`);
  } catch (error) {
    console.error(error);
    message.reply("Error al reproducir la canción.");
  }

  player.on(AudioPlayerStatus.Idle, () => {
    connection.destroy();
  });
});

client.login(process.env.TOKEN);
