import Koa, { Next } from "koa";
import { IErr } from "../types/IRoute";

export default async (ctx: Koa.Context, next: Koa.Next): Promise<Next> => {
	try {
		return await next();
	} catch (e) {
		ctx.status = 500;
		ctx.body = {
			ok: false,
			status: ctx.status,
			error: e.message
		} as IErr;
	}
};