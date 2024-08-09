const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

async function pingWebsite(websiteURL, websiteName, imageLink){
    let embed;
    let adminAlert;
    try {
        const response = await axios.get(websiteURL);
        const data = response.data;
        embed = new EmbedBuilder()
            .setColor('#1F8B4C')
            .setTitle(`**${websiteName}**`)
            .setThumbnail(imageLink)
            .addFields(
                { name: 'Statut', value: '*🟢 En ligne*', inline: false },
                { name: 'Lien : ', value: `[${websiteName}](${websiteURL})`, inline: false },
            )
    } catch (error) {
        embed = new EmbedBuilder()
            .setColor('#1F8B4C')
            .setTitle(`**${websiteName}**`)
            .setThumbnail(imageLink)
            .addFields(
                { name: 'Statut', value: '*🔴 En panne*', inline: false },
                { name: 'Lien : ', value: `[${websiteName}](${websiteURL})`, inline: false },
            )
        adminAlert = `<@&1271410358569140265> 🚨 **Alerte :** Le site 🔥 **${websiteName}** 🔥 est actuellement en panne !`
    }
    return {embed, adminAlert};

}

module.exports = pingWebsite;