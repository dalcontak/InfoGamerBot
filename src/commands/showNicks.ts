import { CommandInt } from '../interfaces/CommandInt';
import DataGamerModel from '../database/models/DataGamerModel';
import { MessageEmbed } from 'discord.js';

export const showNicks : CommandInt = {
    name: "show",
    description: "Show nicknames of a gamer",
    run: async (message, bot) => {
        const { channel, content } = message;
        const args = content.trim().split(/ +/g).slice(2);

        if (args.length == 0){
            return;
        }

        const discordIdGamer = args[0].substring(3, args[0].length - 1);

        const userDiscord = bot.users.cache.find(u => u.id === discordIdGamer);

        const nicksInGames =
            await DataGamerModel.find({ discordId: userDiscord?.id }, {nameGame: 1, nick: 1})
            .sort({nameGame: 1});

        const showNicksEmbed = new MessageEmbed();
        showNicksEmbed.setTitle("Nicks in Games");

        nicksInGames.forEach(
            e => showNicksEmbed.addFields(
                    { name: e.nameGame, value: e.nick, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true }
            )
        );

        await channel.send({ embeds: [showNicksEmbed] });
        await message.delete();
    }
}