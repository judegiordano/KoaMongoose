import limiter from "koa2-ratelimit";
import mongoose from "mongoose";
import { RateLimit } from "../types/Constants";
import config from "../helpers/config";

export default limiter.RateLimit.middleware({
	interval: { hour: 24 },
	max: 10,
	store: new limiter.Stores.Mongodb(mongoose.connection, {
		collectionName: config.RATE_LIMIT_STORE.collectionName,
		collectionAbuseName: config.RATE_LIMIT_STORE.collectionAbuseName,
	}),
	message: RateLimit.oneDay
});