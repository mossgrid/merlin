import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';

const data = new SlashCommandBuilder()
    .setName('define')
    .setDescription('Seek now, the signification of a word')
    .addStringOption((option) => option.setName('word').setDescription('The word to define').setRequired(true));

export const command = {
    fix: 'Define command check',
    data: data,
    async execute(interaction) {
        try {
            const word = await interaction.options.getString('word');
            const definition = await define(word);
            await interaction.reply(definition);
        } catch (error) {
            await interaction.reply(
                'Spell failed to be conjured on word ' + interaction.options.getString('word').toUpperCase()
            );
        }
    }
};

async function define(word) {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const definition = await response.data[0].meanings[0].definitions[0];
        return `${word}:\n${definition.definition}`;
    } catch (err) {
        throw new Error('Irma Pince knows not this word');
    }
}
