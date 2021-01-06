import * as dotenv from "dotenv";
import Koa from "koa";
import path from "path";
import os from "os";
import { Environment, RateLimit } from "../types/Constants";
import IRateLimitOptions from "../types/IRateLimitOptions";

dotenv.config();

let env;
let cors;
if (process.env.NODE_ENV === Environment.prod) {
	env = Environment.prod;
	cors = os.cpus().length;
}
else if (process.env.NODE_ENV === Environment.stg) {
	env = Environment.stg;
	cors = Math.ceil(os.cpus().length / 2);
}
else {
	env = Environment.dev;
	cors = 1;
}

const config = {
	NODE_ENV: <Environment>env,
	PORT: <number>parseInt(process.env.PORT) || 3000,
	CONNECTION_STRING: <string>process.env.CONNECTION_STRING || "",
	JWT_SECRET: <string>process.env.JWT_SECRET || undefined,
	JWT_EXPIRATION: <string | number>"7d",
	EMAIL: <string>process.env.EMAIL || undefined,
	EMAIL_PASSWORD: <string>process.env.EMAIL_PASSWORD || undefined,
	CORES: <number>cors,
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
	SLOW_DOWN: {
		windowMs: <number>30 * 60 * 1000, // 10 minutes
		delayAfter: <number>50,
		delayMs: <number>500
	},
	RATE_LIMIT: <IRateLimitOptions>{
		driver: "memory",
		db: new Map(),
		duration: (60000 * 30), // 30 minutes,
		errorMessage: RateLimit.error,
		id: (ctx: Koa.Context) => ctx.ip,
		headers: {
			remaining: "Rate-Limit-Remaining",
			reset: "Rate-Limit-Reset",
			total: "Rate-Limit-Total"
		},
		max: 100,
		disableHeader: false
	},
	CACHE_SETTINGS: {
		stdTTL: <number>100,
		checkperiod: <number>120
	}
};

if (config.CONNECTION_STRING === undefined) {
	throw Error("CONNECTION_STRING not specified");
}
else if (config.JWT_SECRET === undefined) {
	throw Error("JWT_SECRET must be set");
}
else if (config.EMAIL === undefined) {
	throw Error("EMAIL_SERVICE must be set");
}
else if (config.EMAIL_PASSWORD === undefined) {
	throw Error("EMAIL_PASSWORD must be set");
}

export default config;
