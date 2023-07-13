const mysql = require('mysql');
const cron = require('node-cron');
const fetch = require('node-fetch');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function updateDatabaseAndPost() {
  connection.query("UPDATE gakushoku SET higawari = '休日だよ' WHERE higawari IS NULL;", async (err, result) => {
    if (err) throw err;

    const fetchResponse = await fetch(process.env.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result)
    });

    const apiResponse = await fetchResponse.json();
    console.log("API Response: ", apiResponse);
  });
}

// Execute updateDatabaseAndPost every hour
cron.schedule("10 0 0,8,16 * * *", updateDatabaseAndPost);
