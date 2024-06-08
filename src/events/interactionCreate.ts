import { CommandInteractionOptionResolver, EmbedBuilder } from "discord.js";
import { client } from "..";
import Event from "../structures/Event";

export default new Event("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.followUp({ content: `⚠️ Invalid command.`, ephemeral: true });
        
        try {
            await command.run({ 
                client, 
                interaction,
                opts: interaction.options as CommandInteractionOptionResolver,
            });
        } catch (error) {
            const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`⚠️ Something went wrong.`)
            .setTimestamp();
            return interaction.followUp({ embeds: [embed], ephemeral: true });
        };
    };
});