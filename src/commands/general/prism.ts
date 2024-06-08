import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { Command } from "../../structures/Command";
import config from "../../../config";

export default new Command({
    name: "prism",
    description: `Use the bot's commands.`,
    options: [
        {
            name: "stats",
            type: ApplicationCommandOptionType.Subcommand,
            description: `Check the bot's statistics.`,
        },
    ],
    run: async ({ client, interaction, opts }) => {
        const command = opts.getSubcommand();

        if (command === "stats") {
            const embed = new EmbedBuilder()
            .setColor("#00BFFF")
            .setDescription(`
${config.emotes.point} API Latency: **${client.ws.ping.toLocaleString()}**ms
${config.emotes.point} Servers: **${client.guilds.cache.size.toLocaleString()}**`);
            return interaction.followUp({ embeds: [embed] });
        };
    },
});