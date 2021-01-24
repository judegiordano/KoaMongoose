import * as dotenv from "dotenv";
import path from "path";
import os from "os";
import { Environment, RateLimit } from "../types/Constants";

dotenv.config();

let env: Environment;
let cors: number;

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
	APPTOKEN: <string>process.env.APPTOKEN || undefined,
	APPCODE: <string>process.env.APPCODE || undefined,
	CONNECTION_STRING: <string>process.env.CONNECTION_STRING || undefined,
	JWT_SECRET: <string>process.env.JWT_SECRET || undefined,
	JWT_EXPIRATION: <string | number>"7d",
	EMAIL: <string>process.env.EMAIL || undefined,
	EMAIL_PASSWORD: <string>process.env.EMAIL_PASSWORD || undefined,
	CORES: <number>cors,
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
	RATE_LIMIT: {
		interval: <object>{ hour: <number>1 },
		delayAfter: <number>100,
		timeWait: <number>500,
		max: <number>300,
		message: <string>RateLimit.generic,
	},
	RATE_LIMIT_STORE: {
		collectionName: <string>process.env.RATE_LIMIT_STORE_COLLECTION || "ratelimits",
		collectionAbuseName: <string>process.env.RATE_LIMIT_STORE_COLLECTION_ABUSE || "ratelimitsabuses"
	},
	CACHE_SETTINGS: {
		stdTTL: <number>100,
		checkperiod: <number>120
	},
	MAIL_TRANSPORTER: {
		service: "gmail",
		auth: {
			user: <string>process.env.EMAIL,
			pass: <string>process.env.EMAIL_PASSWORD
		}
	}
};

if (config.CONNECTION_STRING === undefined) {
	throw Error("CONNECTION_STRING not specified");
}
else if (config.JWT_SECRET === undefined) {
	throw Error("JWT_SECRET not specified");
}
else if (config.EMAIL === undefined) {
	throw Error("EMAIL_SERVICE not specified");
}
else if (config.EMAIL_PASSWORD === undefined) {
	throw Error("EMAIL_PASSWORD not specified");
}
else if (config.APPTOKEN === undefined || config.APPCODE === undefined) {
	throw Error("APPTOKEN || APPCODE not specified");
}

export default config;
