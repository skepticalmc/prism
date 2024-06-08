import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { Command } from "../../structures/Command";

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
            .setDescription(`Hello!`);
            return interaction.followUp({ embeds: [embed] });
        };
    },
});