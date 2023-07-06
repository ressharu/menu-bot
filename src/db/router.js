import express from "express";
import bodyParser from "body-parser";

import push from "./datapush.js";
import pull from "./datapull.js";

const router = express.Router();

router.post("/api", bodyParser.json(), async (req, res) => {
	console.log(req.body);
	push(req.body);
	res.end();
});

router.get("/api", async (req, res) => {
	res.json(pull());
	res.end();
});

export default router;
