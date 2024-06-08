import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from "discord.js";
import PrismBot from "../structures/PrismBot";

type RunOptions = {
    client: PrismBot;
    interaction: CommandInteraction;
    opts: CommandInteractionOptionResolver;
};

type Run = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: Run;
} & ChatInputApplicationCommandData;