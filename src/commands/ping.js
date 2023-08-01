import { SlashCommandBuilder } from 'discord.js'

export const command = {
    fix: 'Hello from the ping file',
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction) {
        try {
            await interaction.reply('Pong!')
        } catch (error) {
            await interaction.reply('Spell failed to be conjured!')
        }
    }
}
