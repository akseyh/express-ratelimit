import express, { Request, Response } from "express";

import {
	rateLimiterForIp,
	rateLimiterForToken,
} from "./middlewares/rate-limiter.middleware";
import { auth } from "./middlewares/auth.middleware";

import { JwtClient } from "./helpers/jwt.helper";
import { RedisClient } from "./helpers/redis.helper";

import { PORT } from "./config";

const app = express();
app.set("trust proxy", true);

export const redisClient = new RedisClient();

app.post("/token", rateLimiterForIp, async (req: Request, res: Response) => {
	try {
		const jwtClient = new JwtClient();
		const token = jwtClient.generateToken();

		return res.json({ token });
	} catch (err) {
		return res.status(400).send({ message: "Something went wrong" });
	}
});

app.get("/", rateLimiterForIp, async (req: Request, res: Response) => {
	try {
		return res.json("Express Rate Limit App");
	} catch (err) {
		return res.status(400).send({ message: "Something went wrong" });
	}
});

app.post(
	"/",
	auth,
	rateLimiterForToken,
	async (req: Request, res: Response) => {
		try {
			return res.json("Express Rate Limit App");
		} catch (err) {
			return res.status(400).send({ message: "Something went wrong" });
		}
	},
);

app.listen(PORT, async () => {
	await redisClient.connect();

	console.log(`Server running at http://localhost:${PORT}`);
});
