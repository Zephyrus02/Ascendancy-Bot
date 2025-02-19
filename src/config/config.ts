import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface CanvasConfig {
    width: number;
    height: number;
    background: string;
}

export interface BotConfig {
    welcomeChannelId: string;
    canvas: CanvasConfig;
    welcomeMessage: string;
}

// Validate environment variables
if (!process.env.WELCOME_CHANNEL_ID) {
    throw new Error('WELCOME_CHANNEL_ID is not set in .env file');
}

if (!process.env.DISCORD_TOKEN) {
    throw new Error('DISCORD_TOKEN is not set in .env file');
}

const config: BotConfig = {
    welcomeChannelId: process.env.WELCOME_CHANNEL_ID,
    canvas: {
        width: 700,
        height: 250,
        background: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=700&h=250'
    },
    welcomeMessage: 'Welcome to the server!'
};

export default config;