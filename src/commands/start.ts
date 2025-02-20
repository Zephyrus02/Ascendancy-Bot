import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts a new game session');

export async function execute(interaction: CommandInteraction) {
    try {
        // Since we already deferred the reply in the main handler, use editReply
        await interaction.editReply({
            content: 'Game session started! Ready to play?',
            ephemeral: true
        });
    } catch (error) {
        console.error('Error in start command:', error);
        await interaction.editReply({
            content: 'There was an error starting the game session.',
            ephemeral: true
        });
    }
}