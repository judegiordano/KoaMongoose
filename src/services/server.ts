import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import limiter from "koa2-ratelimit";
import json from "koa-json";
import cors from "koa-cors";
import responseTime from "koa-response-time";
import helmet from "koa-helmet";

import router from "../controllers";
import errorHandler from "../middleware/errorHandler";
import config from "../helpers/config";
import { Environment as Env } from "../types/Constants";

const app: Koa = new Koa();

app.use(errorHandler);
if (config.NODE_ENV === Env.prod || config.NODE_ENV === Env.stg) {
	app.use(limiter.RateLimit.middleware(config.RATE_LIMIT));
}
if (config.NODE_ENV === Env.dev) {
	app.use(logger());
	app.use(responseTime());
}
app.use(cors());
app.use(json());
app.use(helmet());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;