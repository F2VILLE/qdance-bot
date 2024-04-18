const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const ExtendedClient = require("../class/ExtendedClient");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("I will leave your vocal channel"),
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {CommandInteraction} interaction 
     */
    execute(client, interaction) {
        if (!interaction.member.voice) return interaction.reply({ content: "You must be in a voice channel to use this command", ephemeral: true });
        getVoiceConnection(interaction.guild.id)?.destroy();
        interaction.reply({ content: "I'm leaving your voice channel", ephemeral: true });
    }
}