require("dotenv").config()

const Client = require("./class/ExtendedClient")
const client = new Client(process.env.TOKEN)

client.start()