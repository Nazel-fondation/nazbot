const { SlashCommandBuilder} = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('websiteadd')
		.setDescription('Ajouter un site internet à la liste des serveurs')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption(option =>
            option.setName('name')
                .setDescription('Nom du site internet')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('url')
                .setDescription('url du site internet')
                .setRequired(true))
		.addStringOption(option =>
			option.setName('image_url')
				.setDescription('Url d\'une image représentant le site internet')
				.setRequired(true)),
	async execute(interaction) {
		if (global.adminChannel !== interaction.channel){
			return interaction.reply({content: `⚠️ **Erreur :** Vous ne pouvez effectuer cette commande uniquement dans le salon <${global.adminChannel}>`, ephemeral: true});
		}

		const doc = yaml.load(fs.readFileSync(process.env.FILE_DATA_PATH, 'utf8'));
		let name = interaction.options.getString('name');
		let url = interaction.options.getString('url');
		let imageUrl = interaction.options.getString('image_url');
		let websiteID = name.replace(/\s/g, '');

		if (!doc.websites[websiteID]) {
			doc.websites[websiteID] = {
				name: name,
				url: url,
				image: imageUrl
			};
	
			const yamlStr = yaml.dump(doc);
	
			// Écriture de la chaîne YAML dans un fichier
			fs.writeFileSync(process.env.FILE_DATA_PATH, yamlStr, 'utf8');
			
			interaction.reply(`
 - 🌐 __**Site ajouté avec succès !**__ 
  - **Nom :** ${name} 
  - **URL :** ${url} 
  - **Image associée :** ${imageUrl} 

> _Le site a été ajouté à la liste des sites internets._`);
        }else{
			interaction.reply("⚠️ **Erreur :** Un site internet avec ce nom existe déjà. Veuillez choisir un autre nom.");
		}
	},
};