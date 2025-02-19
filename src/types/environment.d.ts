declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            WELCOME_CHANNEL_ID: string;
            NODE_ENV: 'development' | 'production';
        }
    }
}

export {};