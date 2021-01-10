import Koa, { Next } from "koa";
import config from "../helpers/config";
import { RequestErrors } from "../types/Constants";

export default async (ctx: Koa.Context, next: Koa.Next): Promise<Next> => {
	const apptoken = ctx.header["apptoken"];
	const appcode = ctx.header["appcode"];
	try {
		if (!apptoken || !appcode) {
			throw Error(RequestErrors.missingAuthHeaders);
		}
		else if (apptoken !== config.APPTOKEN || appcode !== config.APPCODE) {
			throw Error(RequestErrors.invalidAuthHeaders);
		}
		else return await next();
	} catch (e) {
		throw Error(e);
	}
};