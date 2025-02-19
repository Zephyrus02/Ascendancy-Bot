import { GuildMember, AttachmentBuilder } from 'discord.js';
import { createWelcomeImage } from '../utils/canvasUtils';
import config from '../config/config';

function getRandomWelcomeMessage(username: string): string {
    const messages = config.welcomeMessages;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex].replace('{user}', `<@${username}>`);
}

export async function handleGuildMemberAdd(member: GuildMember): Promise<void> {
    try {
        // Skip if the member is a bot
        if (member.user.bot) return;

        const welcomeChannel = member.guild.channels.cache.get(config.welcomeChannelId);
        
        if (!welcomeChannel || !welcomeChannel.isTextBased()) {
            console.error('Welcome channel not found or is not a text channel. Available channels:', 
                Array.from(member.guild.channels.cache.values())
                    .map(channel => `${channel.name}: ${channel.id}`)
            );
            return;
        }

        const welcomeBuffer = await createWelcomeImage(member, config);
        const attachment = new AttachmentBuilder(welcomeBuffer, { name: 'welcome.png' });
        
        const welcomeMessage = getRandomWelcomeMessage(member.user.id);
        
        await welcomeChannel.send({
            content: welcomeMessage,
            files: [attachment]
        });
    } catch (error) {
        console.error('Error in welcome message:', error);
    }
}