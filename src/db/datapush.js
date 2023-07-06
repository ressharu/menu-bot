/**
 * メニュー登録
 */
import createConnection from "./dbconnect.js";

const registerData = async (year, mth, day, menu) => {
	const client = await createConnection();
	const [result, filelds] = await client.query(
		`INSERT IGNORE INTO higawari VALUES ('${year}','${mth}','${day}', '${menu}')`,
	);
	await client.end();
	return result;
};

export default async (body) => {
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
