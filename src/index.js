import "dotenv/config";
import express from "express";
import serveStatic from "serve-static";

//import linebot_router from "./line-bot/router.js";
//import db_router from "./db/router.js";
//import "./scraping/cron.js";

const app = express();

//app.use(linebot_router);
//app.use(db_router);
app.use("/webfront", serveStatic("src/webfront"));

app.listen(3000, () => console.log("listening on port 3000"));
