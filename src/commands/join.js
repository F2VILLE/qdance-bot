const { SlashCommandBuilder, CommandInteraction, ChannelType } = require("discord.js");
const ExtendedClient = require("../class/ExtendedClient");
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, StreamType } = require("@discordjs/voice");
const { get } = require("https");
const ffmpeg = require('fluent-ffmpeg');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("I will join your vocal channel to play QDance Radio")
        .addChannelOption(option => option
            .setName("voice_channel")
            .setDescription("The voice channel where I will join")

            .setRequired(true)
        ),
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        await interaction.deferReply()
        if (getVoiceConnection(interaction.guild.id)) return interaction.editReply({ content: "I'm already in a voice channel", ephemeral: true })
        if (!interaction.options.get("voice_channel").channel.type === ChannelType.GUILD_VOICE) return interaction.editReply({ content: "You must select a voice channel", ephemeral: true })

        try {
            const connection = joinVoiceChannel({
                channelId: interaction.options.get("voice_channel").channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })
            console.log(connection)
            console.log(connection.ping)
            connection.on("stateChange", async (oldState, newState) => {
                console.log("State change")
                console.log(oldState)
                console.log(newState)
            })

            const player = createAudioPlayer()

            get("https://22593.live.streamtheworld.com/Q_DANCE.mp3", (res) => {
                const s = ffmpeg().input(res).format('mp3').outputOptions("-af bass=g=4").audioBitrate(128).pipe()
                const resource = createAudioResource(s)
                player.play(resource)
                connection.subscribe(player)
            })

        } catch (error) {
            console.log(error)
        }
        interaction.editReply({ content: "I'm joining your voice channel", ephemeral: true })
    }
}