const { get } = require("https")
const fs = require("fs")
const fileStream = fs.createWriteStream("test123.mp3")
const Readable = require("stream").Readable

get("https://22593.live.streamtheworld.com/Q_DANCE.mp3", (res) => {
    res.pipe(fileStream)
    res.on("data" , (data) => {
        console.log("Data received")
    })
    res.on("end", () => {
        console.log("Data ended")
        fileStream.end()
    })
})

process.on("exit", () => {
    fileStream.end()

})