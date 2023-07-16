import express from "express";
import bodyParser from "body-parser";

import push from "./datapush.js";
import pull from "./datapull.js";

const router = express.Router();

router.post("/api", bodyParser.json(), (req, res, next) => {
	const host = req.headers.host;
	if (host == null) {
		res.send(400);
		return;
	}
	
	if (host === process.env.SCRAPING_URL) {
		next();
	} else {
		res.send(400);
	}
}, async (req, res) => {
	console.log(req.body);
	push(req.body);
	res.end();
});

router.get("/api", async (req, res) => {
	res.json(await pull());
	res.end();
});

export default router;
