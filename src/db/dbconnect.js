// require('mysql2')でコールバック関数を使う方法だと動かなかった
import mysql from "mysql2/promise";
import "dotenv/config";

/**
 * DB接続生成
 * DB操作時に接続、クローズをする
 */
const createConnection = async () => {
	return await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME,
	});
};
export default createConnection;
