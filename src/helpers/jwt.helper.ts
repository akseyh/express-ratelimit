import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";

export class JwtClient {
	generateToken() {
		return jwt.sign({ id: new Date().getTime() }, JWT_SECRET);
	}

	verifyToken(token: string) {
		try {
			jwt.verify(token, JWT_SECRET);
			return true;
		} catch (err) {
			return false;
		}
	}
}
