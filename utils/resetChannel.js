const pingMC = require('../pingers/pingMC');
const pingWebsite = require('../pingers/pingWebsite');
const yaml = require('js-yaml');
const fs = require('node:fs');

async function resetChannel(channel, adminChannel ,doc){
    let minecraftServersEmbeds = {};
	let websiteEmbeds = {};
	
	channel.bulkDelete(100);
	channel.send(`
		# 🖥️ **Status des serveurs Minecraft**
	`);
	for (const servers in doc.minecraftServers){
		const server = doc.minecraftServers[servers];
		const ping = await pingMC(server.ip, server.name, server.image);
		if (ping.adminAlert) adminChannel.send(ping.adminAlert);
		let embed = await channel.send({ embeds: [ping.embed] })
		minecraftServersEmbeds[servers] = embed;
	}	
	channel.send(`
        #  🌍**Status des sites internets**
    `);
	for (const websiteID in doc.websites){
		const website = doc.websites[websiteID];
		const ping = await pingWebsite(website.url, website.name, website.image);
		if (ping.adminAlert) adminChannel.send(ping.adminAlert);
		let embed = await channel.send({ embeds: [ping.embed] })
		websiteEmbeds[websiteID] = embed;
	}	

    return { minecraftServersEmbeds: minecraftServersEmbeds, websiteEmbeds: websiteEmbeds };
}

module.exports = resetChannel;