import { Client, Message } from "discord.js";
import { CommandList } from '../commands/_CommandList';

export const onMessage = async (message: Message, bot: Client) => {

    if (message.author.bot) {
        return;
    }

    const prefix = "!info";

    if (!message.content.startsWith(prefix)) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    if (args.length < 1) {
        return;
    }

    for (const Command of CommandList) {
        if (args[0] === Command.name) {
            await Command.run(message, bot);
            break;
        }
    }
};