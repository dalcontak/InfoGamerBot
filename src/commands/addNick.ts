import { MessageEmbed } from 'discord.js';
import DataGamerModel from '../database/models/DataGamerModel';
import { CommandInt } from '../interfaces/CommandInt';
import { validateNameGame } from './validateNameGame';

export const addNick : CommandInt = {
    name: "add",
    description: "Add the nickname of a gamer in a game",
    run: async (message, bot) => {
        const { author, channel, content } = message;
        const args = content.trim().split(/ +/g).slice(2);

        const nameGame = args[0].toLowerCase();

        if (!validateNameGame(nameGame)) {
            return;
        }

        const nick = args[1];

        let targetDataGamer = await DataGamerModel.findOne({ discordId: author.id, nameGame: nameGame });

        if (!targetDataGamer) {
            targetDataGamer = await DataGamerModel.create({
                discordId: author.id,
                nameGame: nameGame,
                nick: nick,
                timestamp: Date.now(),
            });
        }

        targetDataGamer.nick = nick;
        targetDataGamer.timestamp = Date.now();

        await targetDataGamer.save();

        const nicksInGames =
            await DataGamerModel.find({ discordId: author.id }, {nameGame: 1, nick: 1})
            .sort({nameGame: 1});

        const addNickEmbed = new MessageEmbed();
        addNickEmbed.setTitle("Nicks in Games");
        addNickEmbed.setAuthor(
            author.username + '#' + author.discriminator,
            author.displayAvatarURL()
        );

        nicksInGames.forEach(
            e => addNickEmbed.addFields(
                    { name: e.nameGame, value: e.nick, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true }
            )
        );
        
        await channel.send({ embeds: [addNickEmbed] });
        await message.delete();
    }
}