const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1537507317459718289';
const CHANNEL_ID = '1559861570539102308';

client.on('ready', async () => {
    console.log(`[+] Đã đăng nhập thành công tài khoản: ${client.user.tag}`);
    
    try {
        const guild = await client.guilds.fetch(GUILD_ID).catch(() => null);
        if (!guild) {
            console.log('[-] Không tìm thấy Server!');
            return;
        }

        const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
        if (!channel) {
            console.log('[-] Không tìm thấy kênh voice!');
            return;
        }

        await channel.join();
        console.log(`[+] Đã kết nối vào phòng voice thành công: ${channel.name}`);
    } catch (error) {
        console.log('[-] Lỗi join voice:', error.message);
    }
});

// Tự động kết nối lại nếu bị rớt voice
client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.id === client.user.id && !newState.channelId) {
        console.log('[-] Bị rớt voice, đang kết nối lại...');
        setTimeout(async () => {
            const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
            if (channel) await channel.join();
        }, 3000);
    }
});

client.login(TOKEN);
