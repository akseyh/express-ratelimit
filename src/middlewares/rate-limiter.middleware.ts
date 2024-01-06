import { NextFunction, Request, Response } from "express";
import moment from "moment";

import { redisClient } from "..";
import { IP_RATELIMIT, TOKEN_RATELIMIT } from "../config";

const ONE_HOUR = 60 * 60;

export const rateLimiterForIp = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const ip = req.ip;
	const redisId = `IPLIMIT-${ip}`;

	if (!ip) {
		return res.status(403).send({ message: "Not allowed" });
	}

	const requests = await redisClient.incr(redisId);

	if (requests === 1) {
		await redisClient.expire(redisId, ONE_HOUR);
	}

	if (requests > IP_RATELIMIT) {
		const expireTime = await redisClient.expireTime(redisId);
		const availableAt = moment(expireTime * 1000).fromNow();

		return res.status(429).send({
			message: `too much request, try again ${availableAt}`,
		});
	}

	next();
};

export const rateLimiterForToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authorization = req.headers.authorization;
	const redisId = `TOKENLIMIT-${authorization}`;

	if (!authorization) {
		return res.status(403).send({ message: "Not allowed" });
	}

	const requests = await redisClient.incr(redisId);

	if (requests === 1) {
		await redisClient.expire(redisId, ONE_HOUR);
	}

	if (requests > TOKEN_RATELIMIT) {
		const expireTime = await redisClient.expireTime(redisId);
		const availableAt = moment(expireTime * 1000).fromNow();

		return res.status(429).send({
			message: `too much request, try again ${availableAt}`,
		});
	}

	next();
};
