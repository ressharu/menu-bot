import { JSDOM } from "jsdom";

const mn1 = "http://www.gakushoku.com/univ_mn1.php";
const mn2 = "http://www.gakushoku.com/univ_mn2.php";

const getHtmlDocument = async (url) => {
	const text = await (await fetch(url)).text();
	const dom = new JSDOM(text);
	return dom.window.document;
};

const getMenu = async (url) => {
	const document = await getHtmlDocument(url);
	const tbody = document.querySelector("tbody");
	const [date, higawari, ..._] = [...tbody.children];

	const month = /^[1-9]+/.exec([...date.children][0].textContent)[0];
	const days = [...date.children]
		.slice(1)
		.map((d) => /[1-9]+/.exec(d.textContent)[0]);

	const menu = {
		month,
		days,
		higawari: [...higawari.children].slice(1).map((e) => e.textContent),
	};

	return menu;
};

export default async () => [getMenu(mn1), getMenu(mn2)];
/*
// テスト用
export default async () => [
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
];
*/
