require ('../../main.js');
const resetChannel = require('../../utils/resetChannel');

const { PermissionFlagsBits } = require('discord.js');
const { SlashCommandBuilder} = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDescription('recharger la liste des serveurs'),
	async execute(interaction) {
		if (global.adminChannel !== interaction.channel){
			return interaction.reply({content: `⚠️ **Erreur :** Vous ne pouvez effectuer cette commande uniquement dans le salon <${global.adminChannel}>`, ephemeral: true});
		}

		const channel = global.channelStatus;
		const adminChannel = global.adminChannel;
		let doc = yaml.load(fs.readFileSync(process.env.FILE_DATA_PATH, 'utf8'));
		await resetChannel(channel, adminChannel, doc);
		interaction.reply("🔄 **La liste des serveurs a été rechargée avec succès !** 🎉");
	},
};