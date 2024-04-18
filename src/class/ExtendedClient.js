const { Client, Routes } = require("discord.js");
const fs = require("fs");

class ExtendedClient extends Client {
    constructor(token) {
        super({
            intents: [
                "GuildMembers",
                "GuildBans",
                "GuildEmojisAndStickers",
                "GuildIntegrations",
                "GuildMessages",
                "GuildModeration",
                "MessageContent",
                "GuildVoiceStates",
                "Guilds",
            ]
        });
        this.token = token;
        this.commands = new Map();
    }

    loadCommands() {
        const commandsBody = []
        for (const file of fs.readdirSync("./src/commands")) {
            const command = require(`../commands/${file}`);
            this.commands.set(command.data.name, command);
            commandsBody.push(command.data.toJSON());
        }

        this.on("ready", async () => {
            this.loadModules();
            const guilds = await this.guilds.fetch();

            for (const guild of guilds) {
                try {
                    await this.rest.put(Routes.applicationGuildCommands(this.user.id, guild[1].id), { body: commandsBody })
                    console.log(`Loaded commands for ${guild[1].name}`);
                } catch (error) {
                    console.log(`Failed to load commands for ${guild[1].name}`)
                }
            }

        });


        this.on("interactionCreate", async interaction => {
            if (!interaction.isCommand()) return;
            const command = this.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(this, interaction);
            } catch (error) {
                console.error(error);
                if (!interaction.replied) return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
                interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
            }
        })
    }

    loadEvents() {
        for (const file of fs.readdirSync("./src/events")) {
            const event = require(`../events/${file}`);
            this.on(event.name, (...args) => event.execute(this, ...args));
        }
    }

    loadModules() {
        for (const file of fs.readdirSync("./src/modules")) {
            require(`../modules/${file}`)(this);
        }
    }

    start() {
        this.loadCommands();
        this.loadEvents();
        this.login(this.token);
        return this;
    }
}

module.exports = ExtendedClient;