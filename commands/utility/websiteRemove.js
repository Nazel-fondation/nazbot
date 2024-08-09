const { SlashCommandBuilder} = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('websiteremove')
		.setDescription('Supprimer un site internet de la liste des sites')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption(option =>
            option.setName('website_name')
                .setDescription('Nom du site à supprimer')
                .setRequired(true)),
	async execute(interaction) {
		if (global.adminChannel !== interaction.channel){
			return interaction.reply({content: `⚠️ **Erreur :** Vous ne pouvez effectuer cette commande uniquement dans le salon <${global.adminChannel}>`, ephemeral: true});
		}

		const doc = yaml.load(fs.readFileSync(process.env.FILE_DATA_PATH, 'utf8'));
		let name = interaction.options.getString('website_name');
		let websiteID = name.replace(/\s/g, '');
		
		if (doc.websites[websiteID]) {
			delete doc.websites[websiteID];
			const yamlStr = yaml.dump(doc);
			fs.writeFileSync(process.env.FILE_DATA_PATH, yamlStr, 'utf8');
			interaction.reply(`🗑️ **Site internet ${name} supprimé avec succès !**`);		
		}else {
			interaction.reply("⚠️ **Erreur :** Aucun site internet trouvé avec ce nom.");
		}
	},
};