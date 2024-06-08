import { client } from "..";
import Event from "../structures/Event";
import logger from "../utils/logger";

export default new Event("ready", () => {
    logger.info(`Logged in as ${client.user?.username}!`);
});