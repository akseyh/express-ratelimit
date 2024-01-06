import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const IP_RATELIMIT = Number(process.env.IP_RATELIMIT) || 100;
export const TOKEN_RATELIMIT = Number(process.env.TOKEN_RATELIMIT) || 200;
export const JWT_SECRET = process.env.JWT_SECRET || "";
