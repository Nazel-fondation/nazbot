require('dotenv').config();

const yaml = require('js-yaml');
const fs = require('node:fs');
const _ = require('lodash');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const pingMC = require('./pingers/pingMC');
const pingWebsite = require('./pingers/pingWebsite');
const resetChannel = require('./utils/resetChannel');
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	let doc = yaml.load(fs.readFileSync(process.env.FILE_DATA_PATH, 'utf8'));
	const channel = client.channels.cache.get(process.env.CHANNEL_STATUS_ID);
	const adminChannel = client.channels.cache.get(process.env.CHANNEL_ADMIN_ID);
	global.channelStatus = channel;
	global.adminChannel = adminChannel;
	let embedsAvailable = await resetChannel(channel, adminChannel, doc)
	let minecraftServersEmbeds = embedsAvailable.minecraftServersEmbeds;
	let websiteEmbeds = embedsAvailable.websiteEmbeds;


	const sendMessage = async () => {
		const newDoc = yaml.load(fs.readFileSync(process.env.FILE_DATA_PATH, 'utf8'));
		//Verify if config is updated
		if (_.isEqual(newDoc, doc)) {
			for (const embedID in minecraftServersEmbeds) {
				const embed = await minecraftServersEmbeds[embedID];
				const server = doc.minecraftServers[embedID];
				const ping = await pingMC(server.ip, server.name, server.image);
				if (ping.adminAlert) adminChannel.send(ping.adminAlert);
				await embed.edit({ embeds: [ping.embed] });
			}
			for (const embedID in websiteEmbeds) {
				const embed = await websiteEmbeds[embedID];
				const website = doc.websites[embedID];
				const ping = await pingWebsite(website.url, website.name, website.image);
				if (ping.adminAlert) adminChannel.send(ping.adminAlert);
				await embed.edit({ embeds: [ping.embed] });
			}
		}else{
			console.log("Updated config detected, channel reloading...");
			doc = newDoc;
			embedsAvailable = await resetChannel(channel, adminChannel, doc)
			minecraftServersEmbeds = embedsAvailable.minecraftServersEmbeds;
			websiteEmbeds = embedsAvailable.websiteEmbeds;
		}
	};

    sendMessage(); 
    setInterval(sendMessage, 5 * 60 * 1000); // 5 minutes
});

client.login(token);

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

module.exports = client;