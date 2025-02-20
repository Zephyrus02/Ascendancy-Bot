import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('start')
    .setDescription('Check if the bot is active');

export async function execute(interaction: CommandInteraction) {
    try {
        // Defer the reply immediately
        await interaction.deferReply({ ephemeral: true });

        // Send the actual response
        await interaction.editReply({
            content: '🎮 Bot is active and ready to serve!'
        });
    } catch (error) {
        console.error('Error in start command:', error);
        try {
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: 'Failed to process command.',
                    ephemeral: true
                });
            } else if (interaction.deferred) {
                await interaction.editReply({
                    content: 'Failed to process command.'
                });
            }
        } catch (followUpError) {
            console.error('Error sending error message:', followUpError);
        }
    }
}