import express from "express";

import linebot_router from "./line-bot/server.js";

const app = express();

app.use(linebot_router);
app.listen(3000, () => console.log("listening on port 3000"));
