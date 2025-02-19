import { GuildMember, AttachmentBuilder } from 'discord.js';
import { createWelcomeImage } from '../utils/canvasUtils';
import config from '../config/config';

export async function handleGuildMemberAdd(member: GuildMember): Promise<void> {
    try {
        console.log('Channel ID from config:', config.welcomeChannelId);
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
        
        await welcomeChannel.send({
            content: `Welcome ${member.user}!`,
            files: [attachment]
        });
    } catch (error) {
        console.error('Error in welcome message:', error);
    }
}