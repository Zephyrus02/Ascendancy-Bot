import { Client, ActivityType, ChannelType } from 'discord.js';

export async function handleReady(client: Client): Promise<void> {
    console.log(`Logged in as ${client.user?.tag}`);
    
    const updateMemberCount = async () => {
        try {
            const guild = client.guilds.cache.first();
            if (!guild) {
                console.error('No guild found');
                return;
            }

            console.log('Updating member count for guild:', guild.name);

            // Get all members and filter out bots
            const members = await guild.members.fetch();
            const humanCount = members.filter(member => !member.user.bot).size;

            console.log('Human count:', humanCount);

            // Find or create the member count channel
            let memberCountChannel = guild.channels.cache.find(
                channel => channel.name.startsWith('👥 Members:')
            );

            const channelName = `👥 Members: ${humanCount}`;

            if (!memberCountChannel) {
                console.log('Creating new member count channel');
                // Check bot permissions first
                const botMember = guild.members.cache.get(client.user!.id);
                if (!botMember?.permissions.has('ManageChannels')) {
                    console.error('Bot lacks ManageChannels permission!');
                    return;
                }

                memberCountChannel = await guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildVoice,
                    position: 0,
                    reason: 'Created member count channel',
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ['Connect'],
                            allow: ['ViewChannel']
                        },
                        {
                            id: client.user!.id,
                            allow: ['ManageChannels', 'ViewChannel']
                        }
                    ]
                });
                console.log('Created new channel:', memberCountChannel.name);
            } else {
                console.log('Updating existing channel name to:', channelName);
                await memberCountChannel.setName(channelName);
            }
        } catch (error) {
            console.error('Error in updateMemberCount:', error);
        }
    };

    await updateMemberCount();
    setInterval(() => updateMemberCount().catch(console.error), 5 * 60 * 1000);
}