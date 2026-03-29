import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import cron from "node-cron";

import { generateThreadName } from "./utils/formatter.js";

dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  console.log(`Bot started successfully! Logged in as: ${client.user.tag}`);
  cron.schedule(
    "0 9 * * 0", // Format: min hour day month day-of-week(0-6: Sun-Sat)
    async () => {
      try {
        const threadName = generateThreadName();

        const idsString = process.env.TARGET_CHANNEL_IDS || "";
        const channelIds = idsString.split(",");

        const promises = channelIds.map(async id => {
          const cleanId = id.trim();
          if (!cleanId) return;

          const channel = client.channels.cache.get(cleanId);
          if (!channel) {
            console.error(`can't find channel with ID ${cleanId}`);
            return;
          }

          const message = await channel.send(threadName);
          await message.startThread({
            name: threadName,
            autoArchiveDuration: 10080
          });

          console.log(`Thread created in channel ${cleanId}`);
        });

        await Promise.all(promises);
      } catch (error) {
        console.error("An error occurred while running the scheduled task:", error);
      }
    },
    {
      timezone: "Asia/Taipei"
    }
  );
});

client.login(process.env.DISCORD_TOKEN);
