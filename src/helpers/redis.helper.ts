import { createClient, RedisClientType } from "redis";

const REDIS_CONFIG = {
	HOST: "redis",
	PORT: 6379,
};

export class RedisClient {
	private client: RedisClientType;

	constructor() {
		this.client = createClient({
			socket: {
				host: REDIS_CONFIG.HOST,
				port: REDIS_CONFIG.PORT,
			},
		});

		this.client.on("connect", () => {
			console.log("Redis connected");
		});

		this.client.on("error", (err) => {
			console.log("Redis error: ", err);
		});
	}

	public set(key: string, value: string) {
		return this.client.set(key, value);
	}

	public get(key: string) {
		return this.client.get(key);
	}

	public delete(key: string) {
		return this.client.del(key);
	}

	public incr(key: string) {
		return this.client.incr(key);
	}

	public expire(key: string, time: number) {
		return this.client.expire(key, time);
	}

	public expireTime(key: string) {
		return this.client.expireTime(key);
	}

	public connect() {
		return this.client.connect();
	}
}
