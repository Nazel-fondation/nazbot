const axios = require('axios'); 
const { EmbedBuilder } = require('discord.js');
//ServerNumber is used for indention in Discord messages
async function pingMC(ip, serverName, imageLink){
    let embed;
    let adminAlert;
    try {
    const response = await axios.get('https://api.mcstatus.io/v2/status/java/' + ip);
    const data = response.data;
    const online = data.online
        if (online){
            const players = data.players.online;
            const maxPlayers = data.players.max;
            embed = new EmbedBuilder()
                .setColor('#1F8B4C')
                .setTitle(`**${serverName}**`)
                .setThumbnail(imageLink)
                .addFields(
                    { name: 'Statut', value: '*🟢 En ligne*', inline: false },
                    { name: 'Nombre de joueur : ', value: `\`${players}/${maxPlayers}\``, inline: false },
                )
        } else {
            adminAlert = `<@&1271410358569140265> 🚨 **Alerte :** Le serveur 🔥 **${serverName}** 🔥 est actuellement en panne !`
            embed = new EmbedBuilder()
            .setColor('#992D22')
            .setTitle(`**${serverName}**`)
            .setThumbnail(imageLink)
            .addFields(
                { name: 'Statut', value: '*🔴 En panne*', inline: false },
                { name: 'Nombre de joueur : ', value: '`0/100`', inline: false },
            )
        }
    } catch (error) {
        embed = new EmbedBuilder()
        .setColor('#992D22')
        .setTitle(`**${serverName}**`)
        .setThumbnail(imageLink)
        .addFields(
            { name: 'Statut', value: '*🟠 Données indisponible*', inline: false },
            { name: 'Nombre de joueur : ', value: '`0/100`', inline: false },
        )
    }
    return {embed, adminAlert  };

}

module.exports = pingMC;