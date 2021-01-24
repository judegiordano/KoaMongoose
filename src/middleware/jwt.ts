import Koa, { Next } from "koa";
import { IJWT } from "../types/IAbstract";
import Jwt from "../helpers/jwt";
import { JWTErrs } from "../types/Constants";

export default async (ctx: Koa.Context, next: Koa.Next): Promise<Next> => {
	const authHeader: any = ctx.header["authorization"];
	const token: string = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		ctx.state.jwt = null;
		throw Error(JWTErrs.invalidToken);
	}

	try {
		const payload: IJWT = await Jwt.Verify(token);
		if (!payload) {
			ctx.state.jwt = null;
			throw Error(JWTErrs.invalidToken);
		}

		ctx.state.jwt = payload;
		return await next();
	} catch (e) {
		ctx.state.jwt = null;
		throw Error(e);
	}
};