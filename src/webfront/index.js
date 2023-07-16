const main = async () => {
	const data = await (await fetch(`https://${location.host}/api`)).json();
	data.forEach((mn) => {
		for (const i of Array(5).keys()) {
			const div = document.createElement("div");
			div.textContent = `${mn.days[i]}: ${mn.higawari[i]}`;
			document.body.append(div);
		}
	});
};

main();
