import { Client, Intents } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";
import { onMessage } from "./events/onMessage";
import { validateEnv } from './utils/validateEnv';

(async () => {
    if (!validateEnv()) return;

    const BOT = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    });

    BOT.on('ready', () => console.log("Connected to Discord!"));
    BOT.on('messageCreate', async (message) => await onMessage(message, BOT));

    await connectDatabase();
    
    await BOT.login(process.env.BOT_TOKEN);
})();