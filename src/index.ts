import { config } from "dotenv";
config();

import PrismBot from "./structures/PrismBot";

export const client = new PrismBot();

client.build();