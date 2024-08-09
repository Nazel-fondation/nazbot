const { SlashCommandBuilder} = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('minecraftaserveradd')
		.setDescription('Ajouter un serveur minecraft à la liste des serveurs')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption(option =>
            option.setName('name')
                .setDescription('Nom du serveur')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('ip')
                .setDescription('ip du serveur')
                .setRequired(true))
		.addStringOption(option =>
			option.setName('image_url')
				.setDescription('Url d\'une image représentant le serveur')
				.setRequired(true)),
	async execute(interaction) {
		if (global.adminChannel !== interaction.channel){
			return interaction.reply({content: `⚠️ **Erreur :** Vous ne pouvez effectuer cette commande uniquement dans le salon <${global.adminChannel}>`, ephemeral: true});
		}

		const doc = yaml.load(fs.readFileSync(process.env.FILE_DATA_PATH, 'utf8'));
		let name = interaction.options.getString('name');
		let ip = interaction.options.getString('ip');
		let imageUrl = interaction.options.getString('image_url');
		let minecraftServerID = name.replace(/\s/g, '');

		if (!doc.minecraftServers[minecraftServerID]){
			doc.minecraftServers[minecraftServerID] = {
				name: name,
				ip: ip,
				image: imageUrl
			};
	
			const yamlStr = yaml.dump(doc);
	
			// Écriture de la chaîne YAML dans un fichier
			fs.writeFileSync(process.env.FILE_DATA_PATH, yamlStr, 'utf8');
			
	
			interaction.reply(`
				- 🖥 __**Serveur ajouté avec succès !**__ 
				 - **Nom :** ${name} 
				 - **IP :** ${ip} 
				 - **Image associée :** ${imageUrl} 
			   
			   > _Le serveur a été ajouté à la liste des serveurs._`);
		}else{
			interaction.reply("⚠️ **Erreur :** Un serveur avec ce nom existe déjà. Veuillez choisir un autre nom.");
		}
	},
};