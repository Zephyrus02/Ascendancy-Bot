import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import * as startCommand from './commands/start';

dotenv.config();

export async function deployCommands() {
    try {
        if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
            throw new Error('Missing environment variables');
        }

        const commands = [
            startCommand.data.toJSON()
        ];

        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error deploying commands:', error);
        throw error;
    }
}