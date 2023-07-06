const getMenu = async (week, dayofweek) => {
	const menu = await (await fetch(process.env.API_URL)).json();

	return menu[week].higawari[dayofweek];
};

const replyMap = {
	今週の月曜: async (event) => ({ type: "text", text: await getMenu(0, 0) }),
	今週の火曜: async (event) => ({ type: "text", text: await getMenu(0, 1) }),
	今週の水曜: async (event) => ({ type: "text", text: await getMenu(0, 2) }),
	今週の木曜: async (event) => ({ type: "text", text: await getMenu(0, 3) }),
	今週の金曜: async (event) => ({ type: "text", text: await getMenu(0, 4) }),
	来週の月曜: async (event) => ({ type: "text", text: await getMenu(1, 0) }),
	来週の火曜: async (event) => ({ type: "text", text: await getMenu(1, 1) }),
	来週の水曜: async (event) => ({ type: "text", text: await getMenu(1, 2) }),
	来週の木曜: async (event) => ({ type: "text", text: await getMenu(1, 3) }),
	来週の金曜: async (event) => ({ type: "text", text: await getMenu(1, 4) }),
};

export default async (event) => {
	const response = await (
		replyMap[event.message.text] ??
		(() => ({ type: "text", text: "そのメッセージに対応してないっぽい" }))
	)(event);

	return response;
};
