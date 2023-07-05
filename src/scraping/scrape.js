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
