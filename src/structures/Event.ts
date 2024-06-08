import { ClientEvents } from "discord.js";

export default class Event<K extends keyof ClientEvents> {
    constructor(public name: K, public run: (...args: ClientEvents[K]) => any) {};
};