"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const guildMemberAdd_1 = require("./events/guildMemberAdd");
const ready_1 = require("./events/ready");
// Load environment variables
dotenv_1.default.config();
// Create client instance
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
    ]
});
// Register event handlers
client.on('ready', () => (0, ready_1.handleReady)(client));
client.on('guildMemberAdd', guildMemberAdd_1.handleGuildMemberAdd);
// Error handling
client.on('error', (error) => {
    console.error('Discord client error:', error);
});
// Login to Discord
client.login(process.env.DISCORD_TOKEN);
