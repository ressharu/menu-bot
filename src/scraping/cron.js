import cron from "node-cron";
import scrape from "./scrape.js";

cron.schedule("* * 0,8,16 * * *", async () => {
	// 毎日0時、8時、16時に実行
	await fetch(process.env.API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(await scrape()),
	});
});
