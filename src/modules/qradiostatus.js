const { ActivityType } = require("discord.js");
const ExtendedClient = require("../class/ExtendedClient");

/**
 * 
 * @param {ExtendedClient} client 
 */
module.exports =  (client) => {
    const refreshQRadioDatas = async () => {
        await fetch("https://feed.q-dance.com/onair")
        .then(d => {
            if( d.ok ) return d.json()
            throw new Error("Failed to fetch QRadio data")
        })
        .then(data => {
            client.user.setActivity({
                name: `${data.TrackData.NowPlaying.Title} - ${data.TrackData.NowPlaying.Artist}`,
                type: ActivityType.Listening
            })
            setTimeout(() => {
                refreshQRadioDatas()
            }, process.env.QRADIO_REFRESH_INTERVAL || 60000)
        })
        .catch(console.error)
    }
    refreshQRadioDatas()
}