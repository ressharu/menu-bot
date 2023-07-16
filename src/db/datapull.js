import createConnection from "./dbconnect.js";

/**
 * 日替わり定食取得
 */
const getMenu = async (year, mth, day) => {
	const client = await createConnection();
	const [rows, fields] = await client.execute(
		`select * from higawari where 年 = '${year}' and 月 = '${mth}' and 日 = '${day}'`,
	);
	await client.end();
	return rows;
};

export default async () => {
	const res = [];
	const data = new Date();
	data.setDate(data.getDate() - data.getDay() + 1);
	
	const base = data.getDate();

	for (let j = 0; j <= 1; j++) {
		const weekMenu = {
			month: data.getMonth() + 1,
			days: [],
			higawari: [],
		};

		for (let i = 0; i < 5; i++) {
			data.setDate(base + 7 * j + i);	
			const tmp = await getMenu(data.getFullYear(), data.getMonth() + 1, data.getDate());
			weekMenu.days.push(tmp[0]?.["日"] ?? "?");
			weekMenu.higawari.push(tmp[0]?.["メニュー"] === "\n" ? "休日だバカめ" : (tmp[0]?.["メニュー"] ?? "まだ追加されてないよ"));
		}

		res.push(weekMenu);
	}
	return res;
};
