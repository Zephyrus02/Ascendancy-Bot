import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { handleGuildMemberAdd } from './events/guildMemberAdd';
import { handleReady } from './events/ready';

// Load environment variables
dotenv.config();

// Create client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ]
});

// Register event handlers
client.on('ready', () => handleReady(client));
client.on('guildMemberAdd', handleGuildMemberAdd);

// Error handling
client.on('error', (error: Error) => {
    console.error('Discord client error:', error);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);