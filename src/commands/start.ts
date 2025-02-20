import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts a new game session');

export async function execute(interaction: CommandInteraction) {
    try {
        await interaction.editReply({
            content: 'Game session started! Ready to play?'
        });
    } catch (error) {
        console.error('Error in start command:', error);
        await interaction.editReply({
            content: 'There was an error starting the game session.'
        });
    }
}