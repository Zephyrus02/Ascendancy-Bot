import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('start')
    .setDescription('Check if the bot is active');

async function execute(interaction: CommandInteraction) {
    await interaction.reply({
        content: '🎮 Bot is active and ready to serve!',
        ephemeral: true
    });
}

export { data, execute };