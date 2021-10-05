import { Client, Message } from "discord.js";

export interface CommandInt {
    name: string;
    description: string;
    run: (message: Message, bot: Client) => Promise<void>;
}