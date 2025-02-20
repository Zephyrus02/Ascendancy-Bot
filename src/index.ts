import { Client, GatewayIntentBits, ActivityType, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { handleGuildMemberAdd } from './events/guildMemberAdd';
import { handleReady } from './events/ready';
import * as startCommand from './commands/start';
import http from 'http';
import { deployCommands } from './deploy-commands';

// Load environment variables
dotenv.config();

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Discord bot is running!');
});

// Listen on the port provided by Render
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`HTTP server is listening on port ${port}`);
});

// Create client instance with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates 
    ]
});

// Define command interface
interface Command {
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

// Create commands collection with proper typing
const commands = new Collection<string, Command>();
commands.set(startCommand.data.name, startCommand as Command);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ 
            content: 'There was an error executing this command!', 
            ephemeral: true 
        });
    }
});

// Function to update member count
const updateMemberCount = () => {
    const guild = client.guilds.cache.first();
    if (guild) {
        client.user?.setPresence({
            activities: [{ 
                name: `${guild.memberCount} members`,
                type: ActivityType.Watching
            }],
            status: 'online'
        });
    }
};

// Register event handlers
client.on('ready', () => handleReady(client));
client.on('guildMemberAdd', async (member) => {
    await handleGuildMemberAdd(member);
    await handleReady(client); // Update member count
});
client.on('guildMemberRemove', async () => {
    await handleReady(client); // Update member count
});

// Error handling
client.on('error', (error: Error) => {
    console.error('Discord client error:', error);
});

async function startBot() {
    try {
        // Deploy commands first
        await deployCommands();

        // Then start the bot
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error('Error starting bot:', error);
        process.exit(1);
    }
}

// Start the bot
startBot();