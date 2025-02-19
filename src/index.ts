import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { handleGuildMemberAdd } from './events/guildMemberAdd';
import { handleReady } from './events/ready';
import http from 'http';

// Load environment variables
dotenv.config();

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Discord bot is running!');
});

// Listen on the port provided by Render
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`HTTP server is listening on port ${port}`);
});

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