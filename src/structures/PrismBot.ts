import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js";
import { promisify } from "util";
import glob from "glob";
import { CommandType } from "../typings/command";
import { RegisterCommandsOptions } from "../typings/client";
import logger from "../utils/logger";
import Event from "./Event";

const globPromise = promisify(glob);

export default class PrismBot extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({
            intents: [],
        });
    };

    async load() {
        // Commands
        const commands: ApplicationCommandDataResolvable[] = [];
        const commandsFiles = await globPromise(`${__dirname}/../commands/*/*.{ts,js}`);
        commandsFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;

            this.commands.set(command.name, command);
            commands.push(command);
        });

        this.on("ready", () => this.registerCommands({
            commands,
            guildId: process.env.GUILD_ID,
        }));

        // Events
        const eventsFiles = await globPromise(`${__dirname}/../events/*.{ts,js}`);
        eventsFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.name, event.run);
        });
    };

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            logger.info(`${commands.length} commands registered locally. (Guild ID: ${guildId})`);
        } else {
            this.application?.commands.set(commands);
            logger.info(`${commands.length} commands registered globally.`);
        };
    };

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    };

    build() {
        this.load();
        this.login(process.env.TOKEN);
    };
};