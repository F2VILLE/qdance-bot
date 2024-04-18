const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const ExtendedClient = require("../class/ExtendedClient");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("What's playing on the radio ?"),
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        await interaction.deferReply()
        fetch("https://feed.q-dance.com/onair")
        .then(d => {
            if( d.ok ) return d.json()
            throw new Error("Failed to fetch QRadio data")
        })
        .then(data => {
            const embed = {
                title: "🎵 Now playing on QDance Radio",
                description: `## ${data.TrackData.NowPlaying.Title}\n${data.TrackData.NowPlaying.Artist}`,
                image: {
                    url: data.TrackData.NowPlaying.CoverImage
                },
                color: 0xff7766,
                footer: {
                    text: "Last track : " + data.TrackData.PreviousPlaying.Title + " - " + data.TrackData.PreviousPlaying.Artist + "\nNext track : " + data.TrackData.NextPlaying.Title + " - " + data.TrackData.NextPlaying.Artist
                }            
            }
            interaction.editReply({ embeds: [embed] })
        })
        .catch(e => {
            console.error(e)
            interaction.editReply({ content: "Failed to fetch QRadio data", ephemeral: true })
        })

    }
}