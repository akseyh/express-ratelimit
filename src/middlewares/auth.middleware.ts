import { NextFunction, Request, Response } from "express";
import { JwtClient } from "../helpers/jwt.helper";

export const auth = (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers.authorization || "";

	const jwtClient = new JwtClient();

	const isVerified = jwtClient.verifyToken(authorization);

	if (!isVerified) {
		return res.status(400).send({ message: "Not authorized" });
	}

	next();
};
