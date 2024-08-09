const { SlashCommandBuilder} = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('minecraftserverremove')
		.setDescription('Supprimer un serveur Minecraft de la liste des serveurs')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption(option =>
            option.setName('server_name')
                .setDescription('Nom du serveur à supprimer')
                .setRequired(true)),
	async execute(interaction) {
		if (global.adminChannel !== interaction.channel){
			return interaction.reply({content: `⚠️ **Erreur :** Vous ne pouvez effectuer cette commande uniquement dans le salon <${global.adminChannel}>`, ephemeral: true});
		}

		const doc = yaml.load(fs.readFileSync(process.env.FILE_DATA_PATH, 'utf8'));
		let name = interaction.options.getString('server_name');
		let minecraftServerID = name.replace(/\s/g, '');
		
		if (doc.minecraftServers[minecraftServerID]) {
			delete doc.minecraftServers[minecraftServerID];
			const yamlStr = yaml.dump(doc);
			fs.writeFileSync(process.env.FILE_DATA_PATH, yamlStr, 'utf8');
			interaction.reply(`🗑️ **Serveur ${name} supprimé avec succès !**`);		
		}else {
			interaction.reply("⚠️ **Erreur :** Aucun serveur trouvé avec ce nom.");
		}
	},
};