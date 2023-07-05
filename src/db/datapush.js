/**
 * メニュー登録
 */
import createConnection from "./dbconnect.js";

const registerData = async (year,mth,day,menu) => {
	const client = await createConnection();
	const [result, filelds] = await client.query(
		`INSERT IGNORE INTO higawari VALUES ('${year}','${mth}','${day}', '${menu}')`,
	);
	await client.end();
	return result;
};

const test = async (body) => {
	for (let j = 0; j <= 1; j++) {
		for (let i = 0; i < 5; i++) {
			const year = new Date().getFullYear();
			const mth = body[j].month;
			const day = body[j].days[i];
			const menu = body[j].higawari[i];
			await registerData(year, mth, day, menu);
		}
	}
};
test([
	{
		month: "7",
		days: ["3", "4", "5", "6", "7"],
		higawari: [
			"ポークステーキデミソース\n小鉢\nライス、味噌汁",
			"鶏チリ\n小鉢\nライス、味噌汁",
			"豚ヒレタレカツ丼\n小鉢\n味噌汁",
			"鶏のバジル風味焼き\n小鉢\nライス、味噌汁",
			"豚唐の黒酢あんかけ\n小鉢\n味噌汁",
		],
	},
	{
		month: "7",
		days: ["3", "4", "5", "6", "7"],
		higawari: [
			"ポークステーキデミソース\n小鉢\nライス、味噌汁",
			"鶏チリ\n小鉢\nライス、味噌汁",
			"豚ヒレタレカツ丼\n小鉢\n味噌汁",
			"鶏のバジル風味焼き\n小鉢\nライス、味噌汁",
			"豚唐の黒酢あんかけ\n小鉢\n味噌汁",
		],
	},
]);