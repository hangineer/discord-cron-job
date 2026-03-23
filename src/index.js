import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import cron from "node-cron";

import { generateThreadName } from "./utils/formatter.js";

dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  console.log(`Bot 已成功啟動！登入身分：${client.user.tag}`);
  cron.schedule(
    "0 9 * * 0", // Format: min hour day month day-of-week(0-6: Sun-Sat)
    async () => {
      try {
        const threadName = generateThreadName();

        const idsString = process.env.TARGET_CHANNEL_IDS || "";
        const channelIds = idsString.split(",");

        for (const id of channelIds) {
          const cleanId = id.trim();
          if (!cleanId) continue;

          const channel = client.channels.cache.get(cleanId);

          if (!channel) {
            console.error(`找不到 ID 為 ${cleanId} 的頻道`);
            continue;
          }

          const message = await channel.send(threadName);
          await message.startThread({
            name: threadName,
            autoArchiveDuration: 10080,
          });

          console.log(`已在頻道 ${cleanId} 建立 Thread`);
        }
      } catch (error) {
        console.error("執行排程時發生錯誤:", error);
      }
    },
    {
      timezone: "Asia/Taipei",
    },
  );
});

client.login(process.env.DISCORD_TOKEN);
