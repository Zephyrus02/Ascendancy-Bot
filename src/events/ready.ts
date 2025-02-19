import { Client, ActivityType, ChannelType } from 'discord.js';

export async function handleReady(client: Client): Promise<void> {
    console.log(`Logged in as ${client.user?.tag}`);
    
    const updateMemberCount = async () => {
        const guild = client.guilds.cache.first();
        if (!guild) return;

        // Get all members and filter out bots
        const members = await guild.members.fetch();
        const humanCount = members.filter(member => !member.user.bot).size;

        // Find or create the member count channel
        let memberCountChannel = guild.channels.cache.find(
            channel => channel.name.startsWith('👥 Members:')
        );

        const channelName = `👥 Members: ${humanCount}`;

        if (!memberCountChannel) {
            // Create a new voice channel for member count
            memberCountChannel = await guild.channels.create({
                name: channelName,
                type: ChannelType.GuildVoice,
                position: 0, // Place at the top
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: ['Connect'] // Prevent members from joining this channel
                    }
                ]
            });
        } else {
            // Update existing channel name
            await memberCountChannel.setName(channelName);
        }
    };

    // Initial update
    await updateMemberCount();

    // Update every 5 minutes
    setInterval(() => updateMemberCount().catch(console.error), 5 * 60 * 1000);
}