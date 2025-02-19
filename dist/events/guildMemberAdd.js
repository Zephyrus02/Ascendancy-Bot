"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildMemberAdd = handleGuildMemberAdd;
const discord_js_1 = require("discord.js");
const canvasUtils_1 = require("../utils/canvasUtils");
const config_1 = __importDefault(require("../config/config"));
async function handleGuildMemberAdd(member) {
    try {
        console.log('Channel ID from config:', config_1.default.welcomeChannelId);
        const welcomeChannel = member.guild.channels.cache.get(config_1.default.welcomeChannelId);
        if (!welcomeChannel || !welcomeChannel.isTextBased()) {
            console.error('Welcome channel not found or is not a text channel. Available channels:', Array.from(member.guild.channels.cache.values())
                .map(channel => `${channel.name}: ${channel.id}`));
            return;
        }
        const welcomeBuffer = await (0, canvasUtils_1.createWelcomeImage)(member, config_1.default);
        const attachment = new discord_js_1.AttachmentBuilder(welcomeBuffer, { name: 'welcome.png' });
        await welcomeChannel.send({
            content: `Welcome ${member.user}!`,
            files: [attachment]
        });
    }
    catch (error) {
        console.error('Error in welcome message:', error);
    }
}
