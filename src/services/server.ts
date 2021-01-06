import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import ratelimit from "koa-ratelimit";
import json from "koa-json";
import cors from "koa-cors";
import slowDown from "koa-slow-down";
import responseTime from "koa-response-time";
import helmet from "koa-helmet";

import router from "../controllers";
import errorHandler from "../middleware/errorHandler";
import config from "../helpers/config";
import { Environment as Env } from "../types/Constants";

const app = new Koa();

app.use(errorHandler);
if (config.NODE_ENV === Env.prod || config.NODE_ENV === Env.stg) {
	app.use(ratelimit(config.RATE_LIMIT));
	app.use(slowDown(config.SLOW_DOWN));
}
if (config.NODE_ENV === Env.dev) {
	app.use(logger());
}
app.use(cors());
app.use(json());
app.use(helmet());
app.use(bodyParser());
app.use(responseTime());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;