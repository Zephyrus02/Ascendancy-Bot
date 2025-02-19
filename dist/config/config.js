"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// Validate environment variables
if (!process.env.WELCOME_CHANNEL_ID) {
    throw new Error('WELCOME_CHANNEL_ID is not set in .env file');
}
if (!process.env.DISCORD_TOKEN) {
    throw new Error('DISCORD_TOKEN is not set in .env file');
}
const config = {
    welcomeChannelId: process.env.WELCOME_CHANNEL_ID,
    canvas: {
        width: 700,
        height: 250,
        background: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=700&h=250'
    },
    welcomeMessage: 'Welcome to the server!'
};
exports.default = config;
